import { ParabolicaRepository } from "../../repositories/interfaces/parabolica/parabolica-repository";


export class GetParabolicaService {

  constructor(
    private parabolicaRepository: ParabolicaRepository
  ){}

  async execute() {

    const parabolica = await this.parabolicaRepository.get();

    if(Object.keys(parabolica).length == 0) {
      return new Error("Nenhuma parabolica cadastrada!")
    }

    try {
      return parabolica
    } catch (error) {
      return error
    }
  }
}