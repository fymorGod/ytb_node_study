import { QuadroRepository } from "../../repositories/interfaces/quadro/quadro-repository";

interface FindQuadroRequest {
  id: string;
}

export class FindQuadroService {
  constructor(
    private quadroRepository: QuadroRepository
  ) {}

  async execute(request: FindQuadroRequest) {

    const { id } = request;

    const quadro = await this.quadroRepository.find({ id });

    if(!quadro) {
      return new Error("Quadro inexistente!")
    }
    try {
      return quadro
    } catch (error) {
      return error
    }
  }
}