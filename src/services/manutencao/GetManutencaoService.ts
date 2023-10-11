import { ManutencaoRepository } from "../../repositories/interfaces/manutencao/manutencao-repository";

export class GetManutencaoService {

  constructor(
    private manutencaoRepository: ManutencaoRepository
  ){}

  async execute() {
    const manutencao = await this.manutencaoRepository.get();

    if(Object.keys(manutencao).length == 0) {
      return new Error("Nenhum manutencão cadastrada!")
    }

    try {
      return manutencao
    } catch (error) {
      return error
    }
  }
}