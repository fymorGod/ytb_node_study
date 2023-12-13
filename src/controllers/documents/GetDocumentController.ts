import { Request, Response } from "express";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { GetDocumentService } from "../../services/documents/GetDocumentService";

class GetDocumentController {

  async handle(req: Request, res: Response) {

    const prismaDocumentRepository = new PrismaDocumentRepository();
    const getDocumentService = new GetDocumentService(prismaDocumentRepository);

    try {
      const documents = await getDocumentService.execute();

      if (documents instanceof Error) {
        return res.status(404).json({ error: "DOCUMENTS_NOT_FOUND", message: documents.message });
      }

      return res.status(201).send({ documents })
    } catch (error) {
      console.error("Erro ao obter documentos:", error);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "Erro interno do servidor" });
    }
  }
}

export { GetDocumentController };