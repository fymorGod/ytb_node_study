import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { CreateAntenaService } from "../../services/antenas/CreateAntenaService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_AntenaService } from "../../services/documents/CreateDocumentAntena";
import { PrismaDocumentAntenaRepository } from "../../repositories/prisma/documents/prisma-document_antena_repository";


class CreateAntenaControler {

  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, tipo_equipamento, station_id } = req.body;

    const prismaAntenaRepository = new PrismaAntenaRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsAntenaRepository = new PrismaDocumentAntenaRepository();

    // Service
    const createAntenaService = new CreateAntenaService(prismaAntenaRepository);

    //executando o service
    const antena = await createAntenaService.execute({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      gain,
      tipos_antena,
      posicao_torre,
      vr,
      tipo_equipamento,
      station_id
    })
    console.log(Object(antena))
    if (antena instanceof Error) {
      return res.status(400).send({
        message: antena.message
      })
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentAntenaService = new CreateDocument_AntenaService(prismaDocumentsAntenaRepository);

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
          const antenaId = Object(antena).id;
          console.log(antenaId)

          // Criando o documento da condensadora
          const doc_antenaCreated = await createDocumentAntenaService.execute({ documentoId, antenaId });

          if (doc_antenaCreated instanceof Error) {
            return res.status(400).json(doc_antenaCreated);
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
          const antenaId = Object(antena).id;
          console.log(documentoId)
          console.log(antenaId)
          const doc_antenaCreated = await createDocumentAntenaService.execute({ documentoId, antenaId });

          if (doc_antenaCreated instanceof Error) {
            return res.status(400).json(doc_antenaCreated);
          }
        }
      }

    }
    return res.status(201).send(
      {
        message: "Antena criada com sucesso!",
        antena
      }
    );
  }
}
export { CreateAntenaControler };