import { DocumentRepository } from "../../repositories/interfaces/documentos/documentos-repository";

interface CreateDocumentRequest {
  path: string;
  filename: string;
  originalName: string;
  fileFormat: string;
}

interface CreateDocumentResponse {
  success: boolean;
  document?: any;
  error?: string;
}
export class CreateDocumentService {
  constructor (
    private documentRepository: DocumentRepository
  ){}

  async execute(request: CreateDocumentRequest): Promise<CreateDocumentResponse> {
    
    const { path, filename, originalName, fileFormat } = request;

    if(!path || !filename || !originalName || !fileFormat) {
      return { success: false, error: "Os campos são obrigatórios" };
    }

    try {
      const document = await this.documentRepository.create({
        path,
        filename,
        originalName,
        fileFormat
      });
      return { success: true, document}
    }  
    catch (error) {
      return { success: false, error: "Erro ao criar o documento"}
    }
  }
}