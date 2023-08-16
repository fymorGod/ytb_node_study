import { CaboRepository } from "../../repositories/interfaces/cabo/cabo-repository";

interface DeleteCaboRequest {
  id: string;
}

export class DeleteCaboService {
  constructor(
    private caboRepository: CaboRepository
  ) {}

  async execute(request: DeleteCaboRequest) {
    const { id } = request;
    const cabo = await this.caboRepository.find({ id })

    if(!cabo) {
      return new Error("Cabo inexistente!")
    }

    try {
      await this.caboRepository.delete({ id })
    }
    catch (error) {
      return new Error("Erro ao deletar o cabo!")
    } 
  }
}