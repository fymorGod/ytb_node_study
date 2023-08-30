import { AntenaRepository } from "../../repositories/interfaces/antena/antena-repository";


export class GetAntenaService {

  constructor(
    private antenaRepository: AntenaRepository
  ){}

  async execute() {

    const antenas = await this.antenaRepository.get();

    if(Object.keys(antenas).length == 0) {
      return new Error("Nenhuma antena cadastrada!")
    }

    try {
      return antenas
    } catch (error) {
      return error
    }
  }
}