import { DocumentTorreRepository } from "../../repositories/interfaces/documentos/documentos_torre-repository";

interface CreateDocument_TorreRequest {
  documentoId: string;
  torreId: string;
}

export class CreateDocument_TorreService {
  constructor(
    private documentTorreRepository: DocumentTorreRepository
  ){}

  async execute(request: CreateDocument_TorreRequest) {
    
    const { documentoId, torreId } = request;

    try {
      await this.documentTorreRepository.create({
        documentoId,
        torreId
      })
    } catch (err) {
      return err;
    }
  }
}