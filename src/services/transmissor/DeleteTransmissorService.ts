import { TransmissorRepository } from "../../repositories/interfaces/transmissor/transmissor-repository";

interface DeleteTransmissorRequest {
  id: string;
}

export class DeleteTransmissorService {

  constructor(
    private transmissorRepository: TransmissorRepository
  ) {}

  async execute(request: DeleteTransmissorRequest) {

    const { id } = request;

    const torre = await this.transmissorRepository.find({ id });

    if(!torre) {
      return new Error("Transmissor inexistente!")
    }

    try {
      await this.transmissorRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}