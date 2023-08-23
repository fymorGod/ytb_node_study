import { NobreakRepository } from "../../repositories/interfaces/nobreak/nobreak-repository";


export class GetNobreakService {

  constructor(
    private nobreakRepository: NobreakRepository
  ){}

  async execute() {

    const nobreak = await this.nobreakRepository.get();

    if(Object.keys(nobreak).length == 0) {
      return new Error("Nenhum nobreak cadastrada!")
    }

    try {
      return nobreak
    } catch (error) {
      return error
    }
  }
}