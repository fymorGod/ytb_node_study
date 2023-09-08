import { QuadroRepository } from "../../repositories/interfaces/quadro/quadro-repository";

interface DeleteQuadroRequest {
  id: string;
}

export class DeleteQuadroService {

  constructor(
    private quadroRepository: QuadroRepository
  ) {}

  async execute(request: DeleteQuadroRequest) {

    const { id } = request;

    const quadro = await this.quadroRepository.find({ id });

    if(!quadro) {
      return new Error("Quadro inexistente!")
    }

    try {
      await this.quadroRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}