import { ExaustorRepository } from "../../repositories/interfaces/exaustor/exaustor-repository";


export class GetExaustorService {

  constructor(
    private exaustorRepository: ExaustorRepository
  ){}

  async execute() {

    const exaustor = await this.exaustorRepository.get();

    if(Object.keys(exaustor).length == 0) {
      return new Error("Nenhuma combinador cadastrada!")
    }

    try {
      return exaustor
    } catch (error) {
      return error
    }
  }
}