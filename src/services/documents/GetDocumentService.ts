import { DocumentRepository } from "../../repositories/interfaces/documentos/documentos-repository";

export class GetDocumentService {

  constructor(
    private documentRepository: DocumentRepository
  ) {}

  async execute() {
    
    const documents = await this.documentRepository.get()

    if(Object.keys(documents).length == 0) {
      return new Error("Nenhum documento registrado!")
    }

    return documents;
  }
}