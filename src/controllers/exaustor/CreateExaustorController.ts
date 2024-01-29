import { Request, Response } from "express";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { CreateExaustorService } from "../../services/exaustor/CreateExaustorService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentExaustorRepository } from "../../repositories/prisma/documents/prisma-document_exaustor_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_ExaustorService } from "../../services/documents/CreateDocumentExaustor";

class CreateExaustorControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tipo_equipamento, station_id } = req.body;

    const prismaExaustorRepository = new PrismaExaustorRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsExaustorRepository = new PrismaDocumentExaustorRepository();
    // Service
    const createExaustorService = new CreateExaustorService(prismaExaustorRepository);

    //executando o service
    const exaustor = await createExaustorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tipo_equipamento,
         station_id
    })
    
    if(exaustor instanceof Error) {
      return res.status(400).send(exaustor.message)
    }
// Criando os documentos
if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentExaustorService = new CreateDocument_ExaustorService(prismaDocumentsExaustorRepository);

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
      const exaustorId = Object(exaustor).id;
      console.log(exaustorId)

      // Criando o documento da condensadora
      const doc_exaustorCreated = await createDocumentExaustorService.execute({ documentoId, exaustorId });

      if (doc_exaustorCreated instanceof Error) {
        return res.status(400).json(doc_exaustorCreated);
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
      console.log(documentoId)
      const exaustorId = Object(exaustor).id;
      console.log(exaustorId)
      const doc_exaustorCreated = await createDocumentExaustorService.execute({ documentoId, exaustorId });

      if (doc_exaustorCreated instanceof Error) {
        return res.status(400).json(doc_exaustorCreated);
      }
    }
  }

}
    //return message to user
    return res.status(201).send(
      {
        message: "Combinador criado com sucesso!",
        exaustor
      }
    );
  }
}

export { CreateExaustorControler };