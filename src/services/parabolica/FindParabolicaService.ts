
import { ParabolicaRepository } from "../../repositories/interfaces/parabolica/parabolica-repository";


interface FindParabolicaRequest {
  id: string;
}

export class FindParabolicaService {
  constructor(
    private parabolicaRepository: ParabolicaRepository
  ) {}

  async execute(request: FindParabolicaRequest) {

    const { id } = request;

    const parabolica = await this.parabolicaRepository.find({ id });

    if(!parabolica) {
      return new Error("Parabolica inexistente!")
    }
    try {
      return parabolica
    } catch (error) {
      return error
    }
  }
}