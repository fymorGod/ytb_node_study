import { Request, Response } from "express";
import { PrismaDpsRepository } from "../../repositories/prisma/prisma-dps-repository";
import { CreateDpsService } from "../../services/dps/CreateDpsService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentDpsRepository } from "../../repositories/prisma/documents/prisma-document_dps_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_DpsService } from "../../services/documents/CreateDocumentDps";

class CreateDpsControler {
  
  async handle(req: Request, res: Response) {
    const {  codigo, marca, modelo, categoria, status, corrente_maxima, classe_dps, tipo_equipamento, station_id } = req.body;

    const prismaDpsRepository = new PrismaDpsRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsDpsRepository = new PrismaDocumentDpsRepository();
    // Service
    const createDpsService = new CreateDpsService(prismaDpsRepository);

    //executando o service
    const dps = await createDpsService.execute({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        corrente_maxima,
        classe_dps,
        tipo_equipamento,
        station_id
    })
    
    if(dps instanceof Error) {
      return res.status(400).send(dps.message)
    }
// Criando os documentos
if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentDpsService = new CreateDocument_DpsService(prismaDocumentsDpsRepository);
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
      const dpsId = Object(dps).id;
      console.log(dpsId)

      // Criando o documento da condensadora
      const doc_dpsCreated = await createDocumentDpsService.execute({ documentoId, dpsId });

      if (doc_dpsCreated instanceof Error) {
        return res.status(400).json(doc_dpsCreated);
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
      const dpsId = Object(dps).id;
      console.log(documentoId)
      console.log(dpsId)
      const doc_dpsCreated = await createDocumentDpsService.execute({ documentoId, dpsId });

      if (doc_dpsCreated instanceof Error) {
        return res.status(400).json(doc_dpsCreated);
      }
    }
  }

}
    //return message to user
    return res.status(201).send(
      {
        message: "Dps criada com sucesso!",
        dps
      }
    );
  }
}

export { CreateDpsControler };