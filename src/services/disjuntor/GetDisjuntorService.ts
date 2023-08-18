import { DisjuntorRepository } from "../../repositories/interfaces/disjuntor/disjuntor-repository";

export class GetDisjuntorService {

  constructor(
    private disjuntorRepository: DisjuntorRepository
  ){}

  async execute() {

    const disjuntores = await this.disjuntorRepository.get();

    if(Object.keys(disjuntores).length == 0) {
      return new Error("Nenhuma antena cadastrada!")
    }

    try {
      return disjuntores
    } catch (error) {
      return error
    }
  }
}