import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { UpdateAntenaService } from "../../services/antenas/UpdateAntenaService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentAntenaRepository } from "../../repositories/prisma/documents/prisma-document_antena_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_AntenaService } from "../../services/documents/CreateDocumentAntena";


class UpdateAntenaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, tipo_equipamento, station_id } = req.body;

    const prismaAntenaRepository = new PrismaAntenaRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsAntenaRepository = new PrismaDocumentAntenaRepository();
    
    const updateAntenaService = new UpdateAntenaService(prismaAntenaRepository);

    const antena = await updateAntenaService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      gain,
      posicao_torre,
      station_id,
      tipo_equipamento,
      tipos_antena,
      vr
    });

    if (antena instanceof Error) {
      return res.status(400).json({ error: antena.message });
    }

    if (req.files && Object.keys(req.files).length > 0) {
      const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
      const createDocumentAntenaService = new CreateDocument_AntenaService(prismaDocumentsAntenaRepository);
      // Verificando se o documento inserido foi PNG
      if (Object.keys(req.files).includes("foto")) {

        const indice = Object.keys(req.files).indexOf("foto")

        const path = "localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
        const filename = "localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
        const originalName = Object.values(req.files)[indice][0].originalname;
        const fileFormat = Object.values(req.files)[indice][0].mimetype;

        const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

        // Retornando mensagem de erro caso aconteça algum errro na criação do doc
        if (docCriado instanceof Error) {
          return res.status(400).json(docCriado.message);
        }

        const id_doc = Object(docCriado).id;
        const antenaId = Object(antena).id;

        // Criando o documento da condensadora
        const doc_antenaCreated = await createDocumentAntenaService.execute({ id_doc, antenaId });
        if (doc_antenaCreated instanceof Error) {
          return res.status(400).json(doc_antenaCreated);
        }
      }

      // Verificando se o documento inserido foi PDF
      if (Object.keys(req.files).includes("file")) {

        const indice = Object.keys(req.files).indexOf("file")

        const path = "localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
        const filename = "localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
        const originalName = Object.values(req.files)[indice][0].originalname;
        const fileFormat = Object.values(req.files)[indice][0].mimetype;

        const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

        const id_doc = Object(docCriado).id;
        const antenaId = Object(antena).id;

        if (docCriado instanceof Error) {
          return res.status(400).json(docCriado.message);
        }

        const doc_antenaCreated = await createDocumentAntenaService.execute({ id_doc, antenaId });

        if (doc_antenaCreated instanceof Error) {
          return res.status(400).json(doc_antenaCreated);
        }
      }
    }
    return res.status(200).json({
      message: "Antena atualizada com sucesso!",
      }
    );
  }
}

export { UpdateAntenaController };