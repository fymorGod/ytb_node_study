import { DocumentRepository } from "../../repositories/interfaces/documentos/documentos-repository";

interface DeleteDocumentRequest {
  id: string;
}

export class DeleteDocumentService {
  constructor(
    private documentRepository: DocumentRepository
  ) {}

  async execute(request: DeleteDocumentRequest) {
    const { id } = request;

    if(!(await this.documentRepository.find({id}))) {
      return new Error("Documento inexistente!")
    }

    return await this.documentRepository.delete({
      id,
    })
  }
}