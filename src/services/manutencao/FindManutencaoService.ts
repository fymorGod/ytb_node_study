import { ManutencaoRepository } from "../../repositories/interfaces/manutencao/manutencao-repository";

interface FindManutencaoRequest {
  id: string;
}

export class FindManutencaoService {
  constructor(
    private manutencaosRepository: ManutencaoRepository
  ) {}

  async execute(request: FindManutencaoRequest) {

    const { id } = request;

    const manutencao = await this.manutencaosRepository.find({ id });

    if(!manutencao) {
      return new Error("Manutencão inexistente!")
    }
    try {
      return manutencao
    } catch (error) {
      return error
    }
  }
}