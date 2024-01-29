import { DocumentDpsRepository } from "../../repositories/interfaces/documentos/documentos_dps-repository";

interface CreateDocument_DpsRequest {
  documentoId: string;
  dpsId: string;
}

export class CreateDocument_DpsService {
  constructor(
    private documentDpsRepository: DocumentDpsRepository
  ){}

  async execute(request: CreateDocument_DpsRequest) {
    
    const { documentoId, dpsId } = request;

    try {
      await this.documentDpsRepository.create({
        documentoId,
        dpsId
      })
    } catch (err) {
      return err;
    }
  }
}