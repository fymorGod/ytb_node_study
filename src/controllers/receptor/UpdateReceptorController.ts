import { Request, Response } from "express";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";
import { UpdateReceptorService } from "../../services/receptor/UpdateReceptorService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentReceptorRepository } from "../../repositories/prisma/documents/prisma-document_receptor_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_ReceptorService } from "../../services/documents/CreateDocumentReceptor";

class UpdateReceptorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, frequencia, symbol_rate, channel, tipo_equipamento, parabolica, station_id } = req.body;

    const prismaReceptorRepository = new PrismaReceptorRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsReceptorRepository = new PrismaDocumentReceptorRepository();
    const updateReceptorService = new UpdateReceptorService(prismaReceptorRepository);

    const receptor = await updateReceptorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      frequencia,
      symbol_rate,
      channel,
      tipo_equipamento,
      parabolica,
      station_id,
    });

    if(receptor instanceof Error) {
      return res.status(400).json({ error: receptor.message });
    }
        // Criando os documentos
        if (req.files != null || req.files != undefined) {

          // Se o usuário enviar algum documento (PDF ou PNG)
          if (Object.keys(req.files).length > 0) {
    
            const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
            const createDocumentReceptorService = new CreateDocument_ReceptorService(prismaDocumentsReceptorRepository);
    
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
              const receptorId = Object(receptor).id;
              console.log(receptorId)
    
              // Criando o documento da condensadora
              const doc_receptorCreated = await createDocumentReceptorService.execute({ documentoId, receptorId });
    
              if (doc_receptorCreated instanceof Error) {
                return res.status(400).json(doc_receptorCreated);
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
              const receptorId = Object(receptor).id;
              console.log(documentoId)
              console.log(receptorId)
              const doc_receptorCreated = await createDocumentReceptorService.execute({ documentoId, receptorId });
    
              if (doc_receptorCreated instanceof Error) {
                return res.status(400).json(doc_receptorCreated);
              }
            }
          }
    
        }
    return res.status(200).json({
      message: "Receptor atualizado com sucesso!",
    });
  }
}

export { UpdateReceptorController };