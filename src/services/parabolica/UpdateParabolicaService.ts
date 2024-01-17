
import { ParabolicaRepository, parabolicaCategoria, parabolicaStatus } from "../../repositories/interfaces/parabolica/parabolica-repository";


interface UpdateParabolicaRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: parabolicaCategoria;
  status?: parabolicaStatus;
  status_anterior?: parabolicaStatus;
  diametro?: number;
  satelite?: string;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateParabolicaService {

  constructor(
    private parabolicaRepository: ParabolicaRepository
  ) {}

  async execute(request: UpdateParabolicaRequest) {
    const {id,codigo,marca,modelo, categoria,status, diametro, satelite,tipo_equipamento,station_id} = request;

    const parabolica = await this.parabolicaRepository.find({id});

    if(!parabolica) {
      return new Error("Parabolica inexistente!")
    }


    const status_anterior = Object(parabolica).status;

    try {
      return await this.parabolicaRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        diametro,
        satelite,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}