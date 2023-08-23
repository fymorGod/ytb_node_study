import { TelemetriaRepository } from "../../repositories/interfaces/telemetria/telemetria-repository";

interface DeleteTelemetriaRequest {
  id: string;
}

export class DeleteTelemetriaService {

  constructor(
    private telemetriaRepository: TelemetriaRepository
  ) {}

  async execute(request: DeleteTelemetriaRequest) {

    const { id } = request;

    const telemetria = await this.telemetriaRepository.find({ id });

    if(!telemetria) {
      return new Error("Telemetria inexistente!")
    }

    try {
      await this.telemetriaRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}