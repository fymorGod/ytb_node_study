import { NobreakRepository } from "../../repositories/interfaces/nobreak/nobreak-repository";

interface DeleteNobreakRequest {
  id: string;
}

export class DeleteNobreakService {

  constructor(
    private nobreakRepository: NobreakRepository
  ) {}

  async execute(request: DeleteNobreakRequest) {

    const { id } = request;

    const nobreak = await this.nobreakRepository.find({ id });

    if(!nobreak) {
      return new Error("Nobreak inexistente!")
    }

    try {
      await this.nobreakRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}