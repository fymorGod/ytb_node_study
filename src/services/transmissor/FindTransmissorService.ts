import { TransmissorRepository } from "../../repositories/interfaces/transmissor/transmissor-repository";


interface FindTransmissorRequest {
  id: string;
}

export class FindTransmissorService {
  constructor(
    private transmissorRepository: TransmissorRepository
  ) {}

  async execute(request: FindTransmissorRequest) {

    const { id } = request;

    const torre = await this.transmissorRepository.find({ id });

    if(!torre) {
      return new Error("Transmissor inexistente!")
    }
    try {
      return torre
    } catch (error) {
      return error
    }
  }
}