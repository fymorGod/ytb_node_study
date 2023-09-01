import { TorreRepository } from "../../repositories/interfaces/torre/torre-repository";

interface DeleteTorreRequest {
  id: string;
}

export class DeleteTorreService {

  constructor(
    private torreRepository: TorreRepository
  ) {}

  async execute(request: DeleteTorreRequest) {

    const { id } = request;

    const torre = await this.torreRepository.find({ id });

    if(!torre) {
      return new Error("Torre inexistente!")
    }

    try {
      await this.torreRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}