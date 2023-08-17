import { CombinadorRepository } from "../../repositories/interfaces/combinador/combinador-repository";

interface FindCombinadorRequest {
  id: string;
}

export class FindCombinadorService {
  constructor(
    private combinadorRepository: CombinadorRepository
  ) {}

  async execute(request: FindCombinadorRequest) {

    const { id } = request;

    const combinador = await this.combinadorRepository.find({ id });

    if(!combinador) {
      return new Error("Combinador inexistente!")
    }
    try {
      return combinador
    } catch (error) {
      return error
    }
  }
}