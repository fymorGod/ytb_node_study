import { DocumentParabolicaRepository } from "../../repositories/interfaces/documentos/documentos_parabolica-repository";

interface CreateDocument_ParabolicaRequest {
  documentoId: string;
  parabolicaId: string;
}

export class CreateDocument_ParabolicaService {
  constructor(
    private documentParabolicaRepository: DocumentParabolicaRepository
  ){}

  async execute(request: CreateDocument_ParabolicaRequest) {
    
    const { documentoId, parabolicaId } = request;

    try {
      await this.documentParabolicaRepository.create({
        documentoId,
        parabolicaId
      })
    } catch (err) {
      return err;
    }
  }
}