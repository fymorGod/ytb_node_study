import { DocumentSwitchRepository } from "../../repositories/interfaces/documentos/documentos_switch-repository";

interface CreateDocument_SwitchRequest {
  documentoId: string;
  switchiesId: string;
}

export class CreateDocument_SwitchService {
  constructor(
    private documentSwitchRepository: DocumentSwitchRepository
  ){}

  async execute(request: CreateDocument_SwitchRequest) {
    
    const { documentoId, switchiesId } = request;

    try {
      await this.documentSwitchRepository.create({
        documentoId,
        switchiesId
      })
    } catch (err) {
      return err;
    }
  }
}