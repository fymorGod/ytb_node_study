import { ArcondicionadoRepository } from "../../repositories/interfaces/arcondicionado/arcondicionado-repository";

interface DeleteArcondicionadoRequest {
  id: string;
}

export class DeleteArcondicionadoService {
  constructor(
    private arcondicionadoRepository: ArcondicionadoRepository
  ) {}

  async execute(request: DeleteArcondicionadoRequest) {
    const { id } = request;

    const arcondicionado = await this.arcondicionadoRepository.find({ id });

    if(!arcondicionado) {
      return new Error("Arcondicionado inexistente!")
    }

    try {
      await this.arcondicionadoRepository.delete({ id });
    } catch (error) {
      return error
    }
  }
}