import { Request, Response } from "express";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { GetDocumentService } from "../../services/documents/GetDocumentService";

class GetDocumentController {
  async handle(req: Request, res: Response) {
    
    const prismaDocumentRepository = new PrismaDocumentRepository();

    const getDocumentService = new GetDocumentService(prismaDocumentRepository);

    const documents = await getDocumentService.execute();

    if(documents instanceof Error) {
      return res.status(400).send({
        message: documents.message
      });
    }

    return res.status(201).send({
      data: documents
    });
  }

}

export  { GetDocumentController };