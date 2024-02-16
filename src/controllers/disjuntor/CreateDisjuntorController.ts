import { Request, Response } from "express";
import { PrismaDisjuntorRepository } from "../../repositories/prisma/prisma-disjuntor-repository";
import { CreateDisjuntorService } from "../../services/disjuntor/CreateDisjuntorService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentDisjuntorRepository } from "../../repositories/prisma/documents/prisma-document_disjuntor_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_DisjuntorService } from "../../services/documents/CreateDocumentDisjuntor";


class CreateDisjuntorControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, corrente_maxima, tipo_equipamento, station_id } = req.body;

    const prismaDisjuntorRepository = new PrismaDisjuntorRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsDisjuntorRepository = new PrismaDocumentDisjuntorRepository();
    // Service
    const createDisjuntorService = new CreateDisjuntorService(prismaDisjuntorRepository);

    //executando o service
    const disjuntores = await createDisjuntorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status, 
         corrente_maxima, 
         tipo_equipamento,
         station_id
    })
    
    if(disjuntores instanceof Error) {
      return res.status(400).send(disjuntores.message)
    }
 // Criando os documentos
 if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentDisjuntorService = new CreateDocument_DisjuntorService(prismaDocumentsDisjuntorRepository);

    // Verificando se o documento inserido foi PNG
    if (Object.keys(req.files).includes("foto")) {

      const indice = Object.keys(req.files).indexOf("foto")

      const path = "http://192.168.6.2:3001/files/" + Object.values(req.files)[indice][0].filename;
      const filename = "http://192.168.6.2:3001/files/" + Object.values(req.files)[indice][0].filename;
      const originalName = Object.values(req.files)[indice][0].originalname;
      const fileFormat = Object.values(req.files)[indice][0].mimetype;

      const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

      // Retornando mensagem de erro caso aconteça algum errro na criação do doc
      if (docCriado instanceof Error) {
        return res.status(400).json(docCriado.message);
      }

      const documentoId = docCriado?.document?.id;
      console.log(documentoId)
      const disjuntorId = Object(disjuntores).id;
      console.log(disjuntorId)

      // Criando o documento da condensadora
      const doc_disjuntorCreated = await createDocumentDisjuntorService.execute({ documentoId, disjuntorId });

      if (doc_disjuntorCreated instanceof Error) {
        return res.status(400).json(doc_disjuntorCreated);
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
      const disjuntorId = Object(disjuntores).id;
      console.log(documentoId)
      console.log(disjuntorId)
      const doc_antenaCreated = await createDocumentDisjuntorService.execute({ documentoId, disjuntorId });

      if (doc_antenaCreated instanceof Error) {
        return res.status(400).json(doc_antenaCreated);
      }
    }
  }

}
    //return message to user
    return res.status(201).send(
      {
        message: "Disjuntor criado com sucesso!",
        disjuntores
      }
    );
  }
}

export { CreateDisjuntorControler };