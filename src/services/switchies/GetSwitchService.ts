import { SwitchRepository } from "../../repositories/interfaces/switchies/switchies-repository";


export class GetSwitchService {
  constructor(
    private switchRepository: SwitchRepository
  ) {}
  async execute() {

    const switchies = await this.switchRepository.get();

    if(Object.keys(switchies).length == 0) {
      return new Error("Nenhum switch cadastrada!")
    }

    try {
      return switchies
    } catch (error) {
      return error
    }
  }
}