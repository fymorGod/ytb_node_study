
import { DpsRepository, classDps, dpsCategoria, dpsStatus } from "../../repositories/interfaces/dps/dps-repository";


interface UpdateDpsRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: dpsCategoria;
  status?: dpsStatus;
  classe_dps?: classDps;
  corrente_maxima?: number;
  quadro?: string;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateDpsService {

  constructor(
    private dpsRepository: DpsRepository
  ) {}

  async execute(request: UpdateDpsRequest) {
    const {id,codigo, marca, modelo, categoria, status, corrente_maxima, classe_dps, quadro, tipo_equipamento, station_id} = request;

    const dps = await this.dpsRepository.find({id});

    if(!dps) {
      return new Error("Dps inexistente!")
    }


    const status_anterior = Object(dps).status;

    try {
      return await this.dpsRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        corrente_maxima,
        classe_dps,
        quadro,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}