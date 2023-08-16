import { CaboRepository } from "../../repositories/interfaces/cabo/cabo-repository";

export class GetCaboService {
  constructor(
    private caboRepository: CaboRepository
  ) {}

  async execute() {
    const cabos = await this.caboRepository.get();

    if(Object.keys(cabos).length == 0 ) {
      return new Error("Nenhum cabo cadastrado!")
    }

    try {
      return cabos
    } catch (error) {
      return error
    }
  }
}