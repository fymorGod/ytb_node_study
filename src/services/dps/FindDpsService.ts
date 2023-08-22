
import { DpsRepository } from "../../repositories/interfaces/dps/dps-repository";


interface FindDpsRequest {
  id: string;
}

export class FindDpsService {
  constructor(
    private dpsRepository: DpsRepository
  ) {}

  async execute(request: FindDpsRequest) {

    const { id } = request;

    const dps = await this.dpsRepository.find({ id });

    if(!dps) {
      return new Error("Dps inexistente!")
    }
    try {
      return dps
    } catch (error) {
      return error
    }
  }
}