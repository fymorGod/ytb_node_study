import { DocumentArcondicionadoRepository } from "../../repositories/interfaces/documentos/documentos_arcondicionado-repository";

interface CreateDocument_ArcondicionadoRequest {
  documentoId: string;
  arcondicionadoId: string;
}

export class CreateDocument_ArcondiconadoService {
  constructor(
    private documentArcondiconadoRepository: DocumentArcondicionadoRepository
  ){}

  async execute(request: CreateDocument_ArcondicionadoRequest) {
    
    const { documentoId, arcondicionadoId } = request;

    try {
      await this.documentArcondiconadoRepository.create({
        documentoId,
        arcondicionadoId
      })
    } catch (err) {
      return err;
    }
  }
}