import { SwitchRepository } from "../../repositories/interfaces/switchies/switchies-repository";

interface DeleteSwitchRequest {
  id: string;
}

export class DeleteSwitchService {

  constructor(
    private switchRepository: SwitchRepository
  ) {}

  async execute(request: DeleteSwitchRequest) {

    const { id } = request;

    const switchies = await this.switchRepository.find({ id });

    if(!switchies) {
      return new Error("Switch inexistente!")
    }

    try {
      await this.switchRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}