import { DocumentQuadroRepository } from "../../repositories/interfaces/documentos/documentos_quadro-repository";

interface CreateDocument_QuadroRequest {
  documentoId: string;
  quadroId: string;
}

export class CreateDocument_QuadroService {
  constructor(
    private documentQuadroRepository: DocumentQuadroRepository
  ){}

  async execute(request: CreateDocument_QuadroRequest) {
    
    const { documentoId, quadroId } = request;

    try {
      await this.documentQuadroRepository.create({
        documentoId,
        quadroId
      })
    } catch (err) {
      return err;
    }
  }
}