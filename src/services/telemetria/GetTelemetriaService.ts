import { TelemetriaRepository } from "../../repositories/interfaces/telemetria/telemetria-repository";


export class GetTelemetriaService {

  constructor(
    private telemetriaRepository: TelemetriaRepository
  ){}

  async execute() {

    const telemetria = await this.telemetriaRepository.get();

    if(Object.keys(telemetria).length == 0) {
      return new Error("Nenhuma telemetria cadastrado!")
    }

    try {
      return telemetria
    } catch (error) {
      return error
    }
  }
}