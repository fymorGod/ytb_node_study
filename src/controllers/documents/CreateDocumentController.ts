import { Request, Response } from "express";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";

class CreateDocumentController {
  async handle(req: Request, res: Response) {
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);

    if(req.files && Object.keys(req.files).length > 0) {
      
      // Verificando se o documento inserido foi PNG
      if (Object.keys(req.files).includes("foto")) {

        const indice = Object.keys(req.files).indexOf("foto")

        const path = " 192.168.6.2:3001/files/" + Object.values(req.files)[indice][0].filename;
        const filename = "192.168.6.2:3001/files/" + Object.values(req.files)[indice][0].filename;
        const originalName = Object.values(req.files)[indice][0].originalname;
        const fileFormat = Object.values(req.files)[indice][0].mimetype;

        const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

        // Retornando mensagem de erro caso aconteça algum errro na criação do doc
        if(docCriado instanceof Error) {
          return res.status(400).json(docCriado.message);
        }

        return res.status(201).json(docCriado);
      }

      // Verificando se o documento inserido foi PDF
      if (Object.keys(req.files).includes("file")) {

        const indice = Object.keys(req.files).indexOf("file")

        const path = "192.168.6.2:3001/files" + Object.values(req.files)[indice][0].filename;
        const filename = "192.168.6.2:3001/files" + Object.values(req.files)[indice][0].filename;
        const originalName = Object.values(req.files)[indice][0].originalname;
        const fileFormat = Object.values(req.files)[indice][0].mimetype;

        const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

        // Retornando mensagem de erro caso aconteça algum errro na criação do doc
        if(docCriado instanceof Error) {
          return res.status(400).json(docCriado.message);
        }

        return res.status(201).json(docCriado);
      }

    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Documento criado com sucesso!",
      }
    );
  }
}

export { CreateDocumentController };
