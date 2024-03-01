import { Request, Response } from "express";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { UpdateTransmissorService } from "../../services/transmissor/UpdateTransmissorService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_TransmissorService } from "../../services/documents/CreateDocumentTransmissor";
import { PrismaDocumentTransmissorRepository } from "../../repositories/prisma/documents/prisma-document_transmissor_repository";

class UpdateTransmissorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, receptor, antena, tipo_equipamento, station_id } = req.body;
  
    const prismaTransmissorRepository = new PrismaTransmissorRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsTransmissorRepository = new PrismaDocumentTransmissorRepository();

    // Service
    const createTransmissorService = new UpdateTransmissorService(prismaTransmissorRepository);

    const transmissor = await createTransmissorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      programmed,
      canal_fisico,
      canal_virtual,
      acoplador_one,
      acoplador_two,
      receptor,
      antena,
      tipo_equipamento,
      station_id,
    });

    if(transmissor instanceof Error) {
      return res.status(400).json({ error: transmissor.message });
    }
      // Criando os documentos
      if (req.files != null || req.files != undefined) {

        // Se o usuário enviar algum documento (PDF ou PNG)
        if (Object.keys(req.files).length > 0) {
  
          const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
          const createDocumentTransmissorService = new CreateDocument_TransmissorService(prismaDocumentsTransmissorRepository);
  
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
            const transmissorId = Object(transmissor).id;
            console.log(transmissorId)
  
            // Criando o documento da condensadora
            const doc_transmissorCreated = await createDocumentTransmissorService.execute({ documentoId, transmissorId });
  
            if (doc_transmissorCreated instanceof Error) {
              return res.status(400).json(doc_transmissorCreated);
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
            const transmissorId = Object(transmissor).id;
            console.log(documentoId)
            console.log(transmissorId)
            const doc_transmissorCreated = await createDocumentTransmissorService.execute({ documentoId, transmissorId });
  
            if (doc_transmissorCreated instanceof Error) {
              return res.status(400).json(doc_transmissorCreated);
            }
          }
        }
  
      }
    return res.status(200).json({
      message: "Transmissor atualizado com sucesso!",
    });
  }
}

export { UpdateTransmissorController };