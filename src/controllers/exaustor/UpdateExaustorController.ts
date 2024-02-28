import { Request, Response } from "express";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { UpdateExaustorService } from "../../services/exaustor/UpdateExaustorService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentExaustorRepository } from "../../repositories/prisma/documents/prisma-document_exaustor_repository";
import { CreateDocument_ExaustorService } from "../../services/documents/CreateDocumentExaustor";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";

class UpdateExaustorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo,marca,modelo, categoria,status,tipo_equipamento,station_id } = req.body;

    const prismaExaustorRepository = new PrismaExaustorRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsExaustorRepository = new PrismaDocumentExaustorRepository();
    
    const updateExaustorService = new UpdateExaustorService(prismaExaustorRepository);

    const exaustor = await updateExaustorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      station_id,
      tipo_equipamento,
    });

    if(exaustor instanceof Error) {
      return res.status(400).json({ error: exaustor.message });
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
    
              const path = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
              const filename = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
              const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
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
    return res.status(200).json({
      message: "exaustor atualizado com sucesso!",
    });
  }
}

export { UpdateExaustorController };