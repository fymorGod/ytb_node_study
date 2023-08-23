import { TelemetriaRepository } from "../../repositories/interfaces/telemetria/telemetria-repository";

interface FindTelemetriaRequest {
  id: string;
}

export class FindTelemetriaService {
  constructor(
    private telemetriaRepository: TelemetriaRepository
  ) {}

  async execute(request: FindTelemetriaRequest) {

    const { id } = request;

    const telemetria = await this.telemetriaRepository.find({ id });

    if(!telemetria) {
      return new Error("Telemetria inexistente!")
    }
    try {
      return telemetria
    } catch (error) {
      return error
    }
  }
}