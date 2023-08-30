import { TransmissorRepository } from "../../repositories/interfaces/transmissor/transmissor-repository";

export class GetTransmissorService {
  constructor(
    private transmissorRepository: TransmissorRepository
  ) {}

  async execute() {

    const transmissor = await this.transmissorRepository.get();

    if(Object.keys(transmissor).length == 0) {
      return new Error("Nenhum transmissor cadastrada!")
    }

    try {
      return transmissor
    } catch (error) {
      return error
    }
  }
}