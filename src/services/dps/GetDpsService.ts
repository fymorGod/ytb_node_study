import { DpsRepository } from "../../repositories/interfaces/dps/dps-repository";


export class GetDpsService {

  constructor(
    private dpsRepository: DpsRepository
  ){}

  async execute() {

    const dps = await this.dpsRepository.get();

    if(Object.keys(dps).length == 0) {
      return new Error("Nenhum dps cadastrada!")
    }

    try {
      return dps
    } catch (error) {
      return error
    }
  }
}