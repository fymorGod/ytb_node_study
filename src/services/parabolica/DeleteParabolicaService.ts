import { ParabolicaRepository } from "../../repositories/interfaces/parabolica/parabolica-repository";

interface DeleteParabolicaRequest {
  id: string;
}

export class DeleteParabolicaService {

  constructor(
    private parabolicaRepository: ParabolicaRepository
  ) {}

  async execute(request: DeleteParabolicaRequest) {

    const { id } = request;

    const parabolica = await this.parabolicaRepository.find({ id });

    if(!parabolica) {
      return new Error("Parabolica inexistente!")
    }

    try {
      await this.parabolicaRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}