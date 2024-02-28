import { Request, Response } from "express";
import { PrismaQuadroRepository } from "../../repositories/prisma/prisma-quadro-repository";
import { UpdateQuadroService } from "../../services/quadro/UpdateQuadroService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentQuadroRepository } from "../../repositories/prisma/documents/prisma-document_quadro_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_QuadroService } from "../../services/documents/CreateDocumentQuadro";

class UpdateQuadroController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id } = req.body || {};

    const prismaQuadroRepository = new PrismaQuadroRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsQuadroRepository = new PrismaDocumentQuadroRepository();

    const updateQuadroService = new UpdateQuadroService(prismaQuadroRepository);

    const quadro = await updateQuadroService.execute({
      id,
      codigo,
      categoria,
      status,
      dps,
      disjuntor,
      station_id,
      tipo_equipamento,
    });

    if(quadro instanceof Error) {
      return res.status(400).json({ error: quadro.message });
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentQuadroService = new CreateDocument_QuadroService(prismaDocumentsQuadroRepository);

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
          const quadroId = Object(quadro).id;
          console.log(quadroId)

          // Criando o documento da condensadora
          const doc_quadroCreated = await createDocumentQuadroService.execute({ documentoId, quadroId });

          if (doc_quadroCreated instanceof Error) {
            return res.status(400).json(doc_quadroCreated);
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
          const quadroId = Object(quadro).id;
          console.log(documentoId)
          console.log(quadroId)
          const doc_quadroCreated = await createDocumentQuadroService.execute({ documentoId, quadroId });

          if (doc_quadroCreated instanceof Error) {
            return res.status(400).json(doc_quadroCreated);
          }
        }
      }

    }
    return res.status(200).json({
      message: "Quadro atualizado com sucesso!",
    });
  }
}

export { UpdateQuadroController };