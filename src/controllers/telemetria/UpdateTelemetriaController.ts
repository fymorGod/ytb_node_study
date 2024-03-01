import { Request, Response } from "express";
import { PrismaTelemetriaRepository } from "../../repositories/prisma/prisma-telemetria-repository";
import { UpdateTelemetriaService } from "../../services/telemetria/UpdateTelemetriaService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentTelemetriaRepository } from "../../repositories/prisma/documents/prisma-document_telemetria_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_TelemetriaService } from "../../services/documents/CreateDocumentTelemetria";

class UpdateTelemetriaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo,marca,modelo, categoria,status,tipo_equipamento,station_id } = req.body;

    const prismaTelemetriaRepository = new PrismaTelemetriaRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsTelemetriaRepository = new PrismaDocumentTelemetriaRepository();
    const updateTelemetriaService = new UpdateTelemetriaService(prismaTelemetriaRepository);

    const telemetria = await updateTelemetriaService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      station_id,
      tipo_equipamento,
    });

    if(telemetria instanceof Error) {
      return res.status(400).json({ error: telemetria.message });
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentTelemetriaService = new CreateDocument_TelemetriaService(prismaDocumentsTelemetriaRepository);

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
          const telemetriaId = Object(telemetria).id;
          console.log(telemetriaId)

          // Criando o documento da condensadora
          const doc_TelemetriaCreated = await createDocumentTelemetriaService.execute({ documentoId, telemetriaId });

          if (doc_TelemetriaCreated instanceof Error) {
            return res.status(400).json(doc_TelemetriaCreated);
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
          const telemetriaId = Object(telemetria).id;
          console.log(documentoId)
          console.log(telemetriaId)
          const doc_telemetriaCreated = await createDocumentTelemetriaService.execute({ documentoId, telemetriaId });

          if (doc_telemetriaCreated instanceof Error) {
            return res.status(400).json(doc_telemetriaCreated);
          }
        }
      }

    }
    return res.status(200).json({
      message: "Telemetria atualizado com sucesso!",
    });
  }
}

export { UpdateTelemetriaController };