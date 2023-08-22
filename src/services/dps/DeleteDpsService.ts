import { DpsRepository } from "../../repositories/interfaces/dps/dps-repository";

interface DeleteDpsRequest {
  id: string;
}

export class DeleteDpsService {

  constructor(
    private dpsRepository: DpsRepository
  ) {}

  async execute(request: DeleteDpsRequest) {

    const { id } = request;

    const dps = await this.dpsRepository.find({ id });

    if(!dps) {
      return new Error("Dps inexistente!")
    }

    try {
      await this.dpsRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}