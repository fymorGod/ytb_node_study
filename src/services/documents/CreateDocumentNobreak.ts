import { DocumentNobreakRepository } from "../../repositories/interfaces/documentos/documentos_nobreak-repository";

interface CreateDocument_NobreakRequest {
  documentoId: string;
  nobreakId: string;
}

export class CreateDocument_NobreakService {
  constructor(
    private documentNobreakRepository: DocumentNobreakRepository
  ){}

  async execute(request: CreateDocument_NobreakRequest) {
    
    const { documentoId, nobreakId } = request;

    try {
      await this.documentNobreakRepository.create({
        documentoId,
        nobreakId
      })
    } catch (err) {
      return err;
    }
  }
}