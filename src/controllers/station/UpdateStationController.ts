import { Request, Response } from "express";
import { PrismaStationRepository } from "../../repositories/prisma/prisma-station-repository";
import { UpdateStationService } from "../../services/station/UpdateStationService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentStationRepository } from "../../repositories/prisma/documents/prisma-document_station_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_stationService } from "../../services/documents/CreateDocumentStation";

class UpdateStationController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { name, address, latitude, link_grafana, longitude, status, manutencaoId} = req.body;

    const prismaStationRepository = new PrismaStationRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsStationRepository = new PrismaDocumentStationRepository();

    const updateStationService = new UpdateStationService(prismaStationRepository);

    const station = await updateStationService.execute({
      id,
      name,
      address,
      latitude,
      link_grafana,
      longitude,
      status,
      manutencaoId
    });

    if(station instanceof Error) {
      return res.status(400).json({ error: station.message });
    }
// Criando os documentos
 if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentStationService = new CreateDocument_stationService(prismaDocumentsStationRepository);

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
      const stationId = Object(station).id;
      console.log(stationId)

      // Criando o documento da condensadora
      const doc_stationCreated = await createDocumentStationService.execute({ documentoId, stationId });

      if (doc_stationCreated instanceof Error) {
        return res.status(400).json(doc_stationCreated);
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
      const stationId = Object(station).id;
      console.log(documentoId)
      console.log(stationId)
      const doc_stationCreated = await createDocumentStationService.execute({ documentoId, stationId });

      if (doc_stationCreated instanceof Error) {
        return res.status(400).json(doc_stationCreated);
      }
    }
  }

}
    return res.status(200).json({
      message: "Station atualizada com sucesso!",
    });
  }
}

export { UpdateStationController };