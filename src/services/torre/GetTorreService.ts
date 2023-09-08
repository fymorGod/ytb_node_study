import { TorreRepository } from "../../repositories/interfaces/torre/torre-repository";

export class GetTorreService {

  constructor(
    private torreRepository: TorreRepository
  ) {}

  async execute() {

    const torre = await this.torreRepository.get();

    if(Object.keys(torre).length == 0) {
      return new Error("Nenhuma torre cadastrada!")
    }

    try {
      return torre
    } catch (error) {
      return error
    }
  }
}