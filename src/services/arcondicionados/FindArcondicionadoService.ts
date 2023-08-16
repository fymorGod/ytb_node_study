import { ArcondicionadoRepository } from "../../repositories/interfaces/arcondicionado/arcondicionado-repository";

interface FindArcondicionadoRequest {
  id: string;
}

export class FindArcondicionadoService {
  constructor(private readonly arcondicionadoRepository: ArcondicionadoRepository) {}

  async execute(request: FindArcondicionadoRequest) {
    const { id } = request;

    const arcondicionado = await this.arcondicionadoRepository.find({ id });

    if(!arcondicionado) {
      return new Error("Arcondicionado inexistente!")
    }

    try {
      return arcondicionado
    } catch (error) {
      return error
    }
  }
}