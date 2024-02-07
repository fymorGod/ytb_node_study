import { DocumentChecklistRepository } from "../../repositories/interfaces/documentos/documentos_checklist-repository";

interface CreateDocument_ChecklistRequest {
  documentoId: string;
  checklistId: string;
}

export class CreateDocument_ChecklistService {
  constructor(
    private documentChecklistRepository: DocumentChecklistRepository
  ){}

  async execute(request: CreateDocument_ChecklistRequest) {
    
    const { documentoId, checklistId } = request;

    try {
      await this.documentChecklistRepository.create({
        documentoId,
        checklistId
      })
    } catch (err) {
      return err;
    }
  }
}