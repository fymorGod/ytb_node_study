import { CombinadorRepository } from "../../repositories/interfaces/combinador/combinador-repository";


export class GetCombinadorService {

  constructor(
    private combinadorRepository: CombinadorRepository
  ){}

  async execute() {

    const combinador = await this.combinadorRepository.get();

    if(Object.keys(combinador).length == 0) {
      return new Error("Nenhuma combinador cadastrada!")
    }

    try {
      return combinador
    } catch (error) {
      return error
    }
  }
}