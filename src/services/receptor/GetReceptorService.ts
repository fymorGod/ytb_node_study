import { ReceptorRepository } from "../../repositories/interfaces/receptor/receptor-repository";

export class GetReceptorService {

  constructor(
    private receptorRepository: ReceptorRepository
  ){}

  async execute() {

    const receptor = await this.receptorRepository.get();

    if(Object.keys(receptor).length == 0) {
      return new Error("Nenhum receptor cadastrado!")
    }

    try {
      return receptor
    } catch (error) {
      return error
    }
  }
}