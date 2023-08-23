import { NobreakRepository } from "../../repositories/interfaces/nobreak/nobreak-repository";

interface FindNobreakRequest {
  id: string;
}

export class FindNobreakService {
  constructor(
    private nobreakRepository: NobreakRepository
  ) {}

  async execute(request: FindNobreakRequest) {

    const { id } = request;

    const nobreak = await this.nobreakRepository.find({ id });

    if(!nobreak) {
      return new Error("Nobreak inexistente!")
    }
    try {
      return nobreak
    } catch (error) {
      return error
    }
  }
}