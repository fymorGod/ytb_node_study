import { DocumentTelemetriaRepository } from "../../repositories/interfaces/documentos/documentos_telemetria-repository";

interface CreateDocument_TelemetriaRequest {
  documentoId: string;
  telemetriaId: string;
}

export class CreateDocument_TelemetriaService {
  [x: string]: any;
  constructor(
    private documentTelemetriaRepository: DocumentTelemetriaRepository
  ){}

  async execute(request: CreateDocument_TelemetriaRequest) {
    
    const { documentoId, telemetriaId } = request;

    try {
      await this.documentTelemetriaRepository.create({
        documentoId,
        telemetriaId
      })
    } catch (err) {
      return err;
    }
  }
}