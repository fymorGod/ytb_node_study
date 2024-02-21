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
    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);

    const prismaDocumentsAntenaRepository = new PrismaDocumentAntenaRepository();
    const createDocumentAntenaService = new CreateDocument_AntenaService(prismaDocumentsAntenaRepository);

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
    console.log(Object(antena))
    if (antena instanceof Error) {
      return res.status(400).send({
        message: antena.message
      })
    }

    if (req.files && Object.keys(req.files).length > 0) {
      
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
        const antenaId = Object(antena).id;
        console.log(antenaId)
        // Criando o documento da antena
        const doc_antenaCreated = await createDocumentAntenaService.execute({ documentoId, antenaId });
        
        if (doc_antenaCreated instanceof Error) {
          return res.status(400).json(doc_antenaCreated);
        }
      }

      // Verificando se o documento inserido foi PDF
      if (Object.keys(req.files).includes("file")) {

        const indice = Object.keys(req.files).indexOf("file")

        const path = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
        const filename = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
        const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
        const fileFormat = Object.values(req.files)[indice][0].mimetype;

        const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

        const documentoId = docCriado?.document?.id;
        console.log(documentoId)
        const antenaId = Object(antena).id;
        console.log(antena)
        if (docCriado instanceof Error) {
          return res.status(400).json(docCriado.message);
        }

        const doc_antenaCreated = await createDocumentAntenaService.execute({ documentoId, antenaId });

        if (doc_antenaCreated instanceof Error) {
          return res.status(400).json(doc_antenaCreated);
        }
      }
    }
    return res.status(200).send(
      {
      message: "Antena atualizada com sucesso!",
      antena
      }
    );
  }
}

export { UpdateAntenaController };