import { Request, Response } from "express";
import { PrismaTorreRepository } from "../../repositories/prisma/prisma-torre-repository";
import { UpdateTorreService } from "../../services/torre/UpdateTorreService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocument_TorreService } from "../../services/documents/CreateDocumenTorre";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { PrismaDocumentTorreRepository } from "../../repositories/prisma/documents/prisma-document_torre_repository";

class UpdateTorreController {

  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca,modelo, categoria, status, tipo_torre, aterramento, altura, tipo_equipamento, station_id } = req.body;

    const prismaTorreRepository = new PrismaTorreRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsTorreRepository = new PrismaDocumentTorreRepository();
    const updateTorreService = new UpdateTorreService(prismaTorreRepository);

    const torre = await updateTorreService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipo_torre,
      aterramento,
      altura,
      tipo_equipamento,
      station_id
    });

    if(torre instanceof Error) {
      return res.status(400).json({ error: torre.message });
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentTorreService = new CreateDocument_TorreService(prismaDocumentsTorreRepository);

        // Verificando se o documento inserido foi PNG
        if (Object.keys(req.files).includes("foto")) {

          const indice = Object.keys(req.files).indexOf("foto")

          const path = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
          const filename = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
         const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          // Retornando mensagem de erro caso aconteça algum errro na criação do doc
          if (docCriado instanceof Error) {
            return res.status(400).json(docCriado.message);
          }

          const documentoId = docCriado?.document?.id;
          console.log(documentoId)
          const torreId = Object(torre).id;
          console.log(torreId)

          // Criando o documento da condensadora
          const doc_torreCreated = await createDocumentTorreService.execute({ documentoId, torreId });

          if (doc_torreCreated instanceof Error) {
            return res.status(400).json(doc_torreCreated);
          }
        }

        // Verificando se o documento inserido foi PDF
        if (Object.keys(req.files).includes("file")) {

          const indice = Object.keys(req.files).indexOf("file")

          const path = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
          const filename = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
         const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          const documentoId = docCriado?.document?.id;
          const torreId = Object(torre).id;
          console.log(documentoId)
          console.log(torreId)
          const doc_torreCreated = await createDocumentTorreService.execute({ documentoId, torreId });

          if (doc_torreCreated instanceof Error) {
            return res.status(400).json(doc_torreCreated);
          }
        }
      }

    }
    return res.status(200).json({
      message: "Torre atualizada com sucesso!",
    });
  }
}

export { UpdateTorreController };