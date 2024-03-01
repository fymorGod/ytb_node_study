import { DocumentTransmissorRepository } from "../../repositories/interfaces/documentos/documentos_transmissor-repository";

interface CreateDocument_TransmissorRequest {
  documentoId: string;
  transmissorId: string;
}

export class CreateDocument_TransmissorService {
  constructor(
    private documentTransmissorRepository: DocumentTransmissorRepository
  ){}

  async execute(request: CreateDocument_TransmissorRequest) {
    
    const { documentoId, transmissorId } = request;

    try {
      await this.documentTransmissorRepository.create({
        documentoId,
        transmissorId
      })
    } catch (err) {
      return err;
    }
  }
}