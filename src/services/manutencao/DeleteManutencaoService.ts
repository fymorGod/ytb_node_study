import { ManutencaoRepository } from "../../repositories/interfaces/manutencao/manutencao-repository";

interface DeleteManutencaoRequest {
  id: string;
}

export class DeleteManutencaoService {

  constructor(
    private manutencaoRepository: ManutencaoRepository
  ) {}

  async execute(request: DeleteManutencaoRequest) {

    const { id } = request;

    const manutencao = await this.manutencaoRepository.find({ id });

    if(!manutencao) {
      return new Error("Manutencão inexistente!")
    }

    try {
      await this.manutencaoRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}