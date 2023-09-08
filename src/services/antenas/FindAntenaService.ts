import { AntenaRepository } from "../../repositories/interfaces/antena/antena-repository";


interface FindAntenaRequest {
  id: string;
}

export class FindAntenaService {
  constructor(
    private antenasRepository: AntenaRepository
  ) {}

  async execute(request: FindAntenaRequest) {

    const { id } = request;

    const antena = await this.antenasRepository.find({ id });

    if(!antena) {
      return new Error("Antena inexistente!")
    }
    try {
      return antena
    } catch (error) {
      return error
    }
  }
}