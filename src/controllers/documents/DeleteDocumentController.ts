import { Request, Response } from "express";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { DeleteDocumentService } from "../../services/documents/DeleteDocumentService";

class DeleteDocumentController {
  async handle(req: Request, res: Response) {
    
    const { id } = req.params;

    const prismaDocumentRepository = new PrismaDocumentRepository();

    const deleteDocumentService = new DeleteDocumentService(prismaDocumentRepository);

    const document = await deleteDocumentService.execute({ id });

    if(document instanceof Error) {
      return res.status(400).send(document.message);
    }
    return res.status(204).end();
  }
}

export { DeleteDocumentController };