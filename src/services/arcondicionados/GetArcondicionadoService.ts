import { ArcondicionadoRepository } from "../../repositories/interfaces/arcondicionado/arcondicionado-repository";

export class GetArcondicionadoService {
  constructor(
    private arcondicionadoRepository: ArcondicionadoRepository
  ) {}

  async execute() {
    const arcondicionados = await this.arcondicionadoRepository.get();

    if(Object.keys(arcondicionados).length == 0) {
      return new Error("Nenhum arcondicionado cadastrado!")
    }

    try {
      return arcondicionados
    } catch (error) {
      return error
    }
  }
}