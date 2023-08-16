import { CaboRepository } from "../../repositories/interfaces/cabo/cabo-repository";


interface FindCaboRequest {
  id: string;
}

export class FindCaboService {
  constructor(private caboRepository: CaboRepository) {}

  async execute(request: FindCaboRequest) {
    const { id } = request;

    const cabo = await this.caboRepository.find({ id });

    if(!cabo) {
      return new Error("Cabo inexistente!")
    }

    try {
      return cabo
    } catch (error) {
      return error
    }
  }
}