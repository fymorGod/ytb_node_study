import { DocumentCaboRepository } from "../../repositories/interfaces/documentos/documentos_cabo-repository";

interface CreateDocument_CaboRequest {
  documentoId: string;
  caboId: string;
}

export class CreateDocument_CaboService {
  constructor(
    private documentCaboRepository: DocumentCaboRepository
  ){}

  async execute(request: CreateDocument_CaboRequest) {
    
    const { documentoId, caboId } = request;

    try {
      await this.documentCaboRepository.create({
        documentoId,
        caboId
      })
    } catch (err) {
      return err;
    }
  }
}