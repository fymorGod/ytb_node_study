import { TorreRepository } from "../../repositories/interfaces/torre/torre-repository";


interface FindTorreRequest {
  id: string;
}

export class FindTorreService {
  constructor(
    private torreRepository: TorreRepository
  ) {}

  async execute(request: FindTorreRequest) {

    const { id } = request;

    const torre = await this.torreRepository.find({ id });

    if(!torre) {
      return new Error("Torre inexistente!")
    }
    try {
      return torre
    } catch (error) {
      return error
    }
  }
}