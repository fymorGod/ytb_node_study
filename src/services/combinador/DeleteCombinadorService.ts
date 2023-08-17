import { CombinadorRepository } from "../../repositories/interfaces/combinador/combinador-repository";

interface DeleteCombinadorRequest {
  id: string;
}

export class DeleteCombinadorService {

  constructor(
    private combinadorRepository: CombinadorRepository
  ) {}

  async execute(request: DeleteCombinadorRequest) {

    const { id } = request;

    const combinador = await this.combinadorRepository.find({ id });

    if(!combinador) {
      return new Error("Combinador inexistente!")
    }

    try {
      await this.combinadorRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}