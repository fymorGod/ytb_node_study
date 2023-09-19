import { TelemetriaRepository, telemetriaCategoria, telemetriaStatus } from "../../repositories/interfaces/telemetria/telemetria-repository";

interface UpdateTelemetriaRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: telemetriaCategoria;
  status?: telemetriaStatus;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateTelemetriaService {

  constructor(
    private telemetriaRepository: TelemetriaRepository
  ) {}

  async execute(request: UpdateTelemetriaRequest) {
    const {id,codigo,marca,modelo, categoria,status,tipo_equipamento,station_id} = request;

    const telemetria = await this.telemetriaRepository.find({id});

    if(!telemetria) {
      return new Error("Telemetria inexistente!")
    }


    const status_anterior = Object(telemetria).status;

    try {
      return await this.telemetriaRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}