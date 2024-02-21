import { DocumentStationRepository } from "../../repositories/interfaces/documentos/documentos_station-repository";

interface CreateDocument_StationRequest {
  documentoId: string;
  stationId: string;
}

export class CreateDocument_stationService {
  constructor(
    private documentStationRepository: DocumentStationRepository
  ){}

  async execute(request: CreateDocument_StationRequest) {
    
    const { documentoId, stationId } = request;

    try {
      await this.documentStationRepository.create({
        documentoId,
        stationId
      })
    } catch (err) {
      return err;
    }
  }
}