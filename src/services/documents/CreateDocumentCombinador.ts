import { DocumentCombinadorRepository } from "../../repositories/interfaces/documentos/documentos_combinador-repositoy";

interface CreateDocument_CombinadorRequest {
  documentoId: string;
  combinadorId: string;
}

export class CreateDocument_CombinadorService {
  constructor(
    private documentCombinadorRepository: DocumentCombinadorRepository
  ){}

  async execute(request: CreateDocument_CombinadorRequest) {
    
    const { documentoId, combinadorId } = request;

    try {
      await this.documentCombinadorRepository.create({
        documentoId,
        combinadorId
      })
    } catch (err) {
      return err;
    }
  }
}