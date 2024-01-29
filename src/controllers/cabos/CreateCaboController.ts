import { Request, Response } from "express";
import { PrismaCaboRepository } from "../../repositories/prisma/prisma-cabo-repository";
import { CreateCaboService } from "../../services/cabos/CreateCaboService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentCaboRepository } from "../../repositories/prisma/documents/prisma-document_cabo_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_CaboService } from "../../services/documents/CreateDocumentCabo";

class CreateCaboController {
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, tipo_equipamento, station_id } = req.body;

    const prismaCaboRepository = new PrismaCaboRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsCaboRepository = new PrismaDocumentCaboRepository();
    //service
    const createCaboService = new CreateCaboService(prismaCaboRepository);

    const cabo = await createCaboService.execute({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipos_cabo,
      tamanho,
      tipo_equipamento,
      station_id
    });

    if(cabo instanceof Error) {
      return res.status(400).json({ error: cabo.message });
    }
// Criando os documentos
if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentCaboService = new CreateDocument_CaboService(prismaDocumentsCaboRepository);

    // Verificando se o documento inserido foi PNG
    if (Object.keys(req.files).includes("foto")) {

      const indice = Object.keys(req.files).indexOf("foto")

      const path = "http://localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
      const filename = "http://localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
      const originalName = Object.values(req.files)[indice][0].originalname;
      const fileFormat = Object.values(req.files)[indice][0].mimetype;

      const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

      // Retornando mensagem de erro caso aconteça algum errro na criação do doc
      if (docCriado instanceof Error) {
        return res.status(400).json(docCriado.message);
      }

      const documentoId = docCriado?.document?.id;
      console.log(documentoId)
      const caboId = Object(cabo).id;
      console.log(caboId)

      // Criando o documento da condensadora
      const doc_caboCreated = await createDocumentCaboService.execute({ documentoId, caboId });

      if (doc_caboCreated instanceof Error) {
        return res.status(400).json(doc_caboCreated);
      }
    }

    // Verificando se o documento inserido foi PDF
    if (Object.keys(req.files).includes("file")) {

      const indice = Object.keys(req.files).indexOf("file")

      const path = "http://localhost:3001/files" + Object.values(req.files)[indice][0].filename;
      const filename = "http://localhost:3001/files" + Object.values(req.files)[indice][0].filename;
      const originalName = Object.values(req.files)[indice][0].originalname;
      const fileFormat = Object.values(req.files)[indice][0].mimetype;

      const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

      const documentoId = docCriado?.document?.id;
      const caboId = Object(cabo).id;
      console.log(documentoId)
      console.log(caboId)
      const doc_caboCreated = await createDocumentCaboService.execute({ documentoId, caboId });

      if (doc_caboCreated instanceof Error) {
        return res.status(400).json(doc_caboCreated);
      }
    }
  }

}
    return res.status(201).json({
      message: 'Cabo criado com sucesso',
      cabo
    });
  }
}
export { CreateCaboController }