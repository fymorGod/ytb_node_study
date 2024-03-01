import { Request, Response } from "express";
import { PrismaSwitchRepository } from "../../repositories/prisma/prisma-switch-repository";
import { UpdateSwitchService } from "../../services/switchies/UpdateSwitchService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentSwitchRepository } from "../../repositories/prisma/documents/prisma-document_switch_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_SwitchService } from "../../services/documents/CreateDocumentSwitch";

class UpdateSwitchController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, qtd_portas, tipo_equipamento, station_id } = req.body;

    const prismaSwitchRepository = new PrismaSwitchRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsSwitchRepository = new PrismaDocumentSwitchRepository();

    const updateSwitchService = new UpdateSwitchService(prismaSwitchRepository);

    const switchies = await updateSwitchService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      qtd_portas,
      station_id,
      tipo_equipamento,
    });

    if(switchies instanceof Error) {
      return res.status(400).json({ error: switchies.message });
    }
        // Criando os documentos
        if (req.files != null || req.files != undefined) {

          // Se o usuário enviar algum documento (PDF ou PNG)
          if (Object.keys(req.files).length > 0) {
    
            const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
            const createDocumentSwitchService = new CreateDocument_SwitchService(prismaDocumentsSwitchRepository);
    
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
              const switchiesId = Object(switchies).id;
              console.log(switchiesId)
    
              // Criando o documento da condensadora
              const doc_switchCreated = await createDocumentSwitchService.execute({ documentoId, switchiesId });
    
              if (doc_switchCreated instanceof Error) {
                return res.status(400).json(doc_switchCreated);
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
              const switchiesId = Object(switchies).id;
              console.log(documentoId)
              console.log(switchiesId)
              const doc_switchCreated = await createDocumentSwitchService.execute({ documentoId, switchiesId });
    
              if (doc_switchCreated instanceof Error) {
                return res.status(400).json(doc_switchCreated);
              }
            }
          }
    
        }
    return res.status(200).json({
      message: "Switch atualizado com sucesso!",
    });
  }
}

export { UpdateSwitchController };