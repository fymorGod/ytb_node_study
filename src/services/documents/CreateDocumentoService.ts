import { DocumentRepository } from "../../repositories/interfaces/documentos/documentos-repository";

interface CreateDocumentRequest {
  path: string;
  filename: string;
  originalName: string;
  fileFormat: string;
}

export class CreateDocumentService {
  constructor (
    private documentRepository: DocumentRepository
  ){}

  async execute(request: CreateDocumentRequest) {
    
    const { path, filename, originalName, fileFormat } = request;

    if(!path || !filename || !originalName || !fileFormat) {
      return new Error("Os campos são obrigatórios")
    }

    return await this.documentRepository.create({
      path,
      filename,
      originalName,
      fileFormat
    })
  }
}