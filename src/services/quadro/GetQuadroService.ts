import { QuadroRepository } from "../../repositories/interfaces/quadro/quadro-repository";


export class GetQuadroService {

  constructor(
    private quadroRepository: QuadroRepository
  ) {}

  async execute() {

    const quadros = await this.quadroRepository.get();

    if(Object.keys(quadros).length == 0) {
      return new Error("Nenhum quadros cadastrado!")
    }

    try {
      return quadros
    } catch (error) {
      return error
    }
  }
}