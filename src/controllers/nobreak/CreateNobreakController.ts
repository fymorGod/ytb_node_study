import { Request, Response } from "express";
import { PrismaNobreakRepository } from "../../repositories/prisma/prisma-nobreak-repository";
import { CreateNobreakService } from "../../services/nobreak/CreateNobreakService";
import { PrismaDocumentNobreakRepository } from "../../repositories/prisma/documents/prisma-document_nobreak_repository";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_NobreakService } from "../../services/documents/CreateDocumentNobreak";


class CreateNobreakControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento, station_id  } = req.body;

    const prismaNobreakRepository = new PrismaNobreakRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsNobreakRepository = new PrismaDocumentNobreakRepository();
    // Service
    const createNobreakService = new CreateNobreakService(prismaNobreakRepository);

    //executando o service
    const nobreak = await createNobreakService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tensao_entrada,
         tensao_saida,
         tipo_equipamento,
         station_id
    })
    
    if(nobreak instanceof Error) {
      return res.status(400).send(nobreak.message)
    }
 // Criando os documentos
 if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentNobreakService = new CreateDocument_NobreakService(prismaDocumentsNobreakRepository);

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
      const nobreakId = Object(nobreak).id;
      console.log(documentoId)
      console.log(nobreakId)

      // Criando o documento da condensadora
      const doc_nobreakCreated = await createDocumentNobreakService.execute({ documentoId, nobreakId });

      if (doc_nobreakCreated instanceof Error) {
        return res.status(400).json(doc_nobreakCreated);
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
      const nobreakId = Object(nobreak).id;
      console.log(documentoId)
      console.log(nobreakId)
      const doc_nobreakCreated = await createDocumentNobreakService.execute({ documentoId, nobreakId });

      if (doc_nobreakCreated instanceof Error) {
        return res.status(400).json(doc_nobreakCreated);
      }
    }
  }

}
    //return message to user
    return res.status(201).send(
      {
        message: "Nobreak criado com sucesso!",
        nobreak
      }
    );
  }
}

export { CreateNobreakControler };