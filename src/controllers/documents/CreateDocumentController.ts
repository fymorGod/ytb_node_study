import { Request, Response } from "express";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";


class CreateDocumentController {
  async handle(req: Request, res: Response) {

    const prismaDocumentRepository = new PrismaDocumentRepository();

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);

    if(req.files != null || req.files != undefined) {

      if(Object.keys(req.files).includes("foto")) {
        const indice = Object.keys(req.files).indexOf("foto")

        const path = "localhost:3333/files" + Object.values(req.files)[indice][0].filename;
        const filename = "localhost:3333/files" + Object.values(req.files)[indice][0].filename;
        const originalName = Object.values(req.files)[indice][0].originalName;
        const fileFormat = Object.values(req.files)[indice][0].mimetype

        const docCreated = await createDocumentService.execute({ path, filename, originalName, fileFormat });

        if(docCreated instanceof Error) {
          return res.status(400).json(docCreated.message);
        }
        
        return res.status(201).json(docCreated)
      }
      
      if (Object.keys(req.files).includes("file")) {
        const indice = Object.keys(req.files).indexOf("file")
        const path = "localhost:3333/files" + Object.values(req.files)[indice][0].filename;
        const filename = "localhost:3333/files" + Object.values(req.files)[indice][0].filename;
        const originalName = Object.values(req.files)[indice][0].originalName;
        const fileFormat = Object.values(req.files)[indice][0].mimetype
        
        const docCreated = await createDocumentService.execute({ path, filename, originalName, fileFormat});

        if(docCreated instanceof Error) {
          return res.status(400).json(docCreated.message);
        }
        return res.status(201).json(docCreated)
      }
    }
    return res.status(201).send(
      {
        message: "Documento criado com sucesso!"
      }
    );
  }
}

export { CreateDocumentController }