import { Request, Response } from "express";
import { PrismaChecklistRepository } from "../../repositories/prisma/prisma-checklist-repository";
import { CreateChecklistService } from "../../services/checklist/CreateChecklistService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentChecklistRepository } from "../../repositories/prisma/documents/prisma-document_checklist_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_ChecklistService } from "../../services/documents/CreateDocumentChecklist";

class CreateChecklistControler {
  
  async handle(req: Request, res: Response) {
    const { name, tarefas, tipo_equipamento } = req.body;

    const prismaChecklistRepository = new PrismaChecklistRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsChecklistRepository = new PrismaDocumentChecklistRepository();
    // Service
    const createChecklistService = new CreateChecklistService(prismaChecklistRepository);

    //executando o service
    const checklist = await createChecklistService.execute({
         name,
         tarefas,
         tipo_equipamento
    })
     // Criando os documentos
     if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentChecklistService = new CreateDocument_ChecklistService(prismaDocumentsChecklistRepository);

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
          console.log(documentoId)
          const checklistId = Object(checklist).id;
          console.log(checklistId)

          // Criando o documento da condensadora
          const doc_checklistCreated = await createDocumentChecklistService.execute({ documentoId, checklistId });

          if (doc_checklistCreated instanceof Error) {
            return res.status(400).json(doc_checklistCreated);
          }
        }

        // Verificando se o documento inserido foi PDF
        if (Object.keys(req.files).includes("file")) {

          const indice = Object.keys(req.files).indexOf("file")

          const path = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
          const filename = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
         const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          const documentoId = docCriado?.document?.id;
          const checklistId = Object(checklist).id;
          console.log(documentoId)
          console.log(checklistId)
          const doc_antenaCreated = await createDocumentChecklistService.execute({ documentoId, checklistId });

          if (doc_antenaCreated instanceof Error) {
            return res.status(400).json(doc_antenaCreated);
          }
        }
      }

    }
    if(checklist instanceof Error) {
      return res.status(400).send(checklist.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Checklist criado com sucesso!",
        checklist
      }
    );
  }
}

export { CreateChecklistControler };