import { SwitchRepository } from "../../repositories/interfaces/switchies/switchies-repository";


interface FindSwitchRequest {
  id: string;
}

export class FindSwitchService {
  constructor(
    private switchsRepository: SwitchRepository
  ) {}

  async execute(request: FindSwitchRequest) {

    const { id } = request;

    const switchies = await this.switchsRepository.find({ id });

    if(!switchies) {
      return new Error("Switch inexistente!")
    }
    try {
      return switchies
    } catch (error) {
      return error
    }
  }
}