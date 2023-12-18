import { AntenaRepository, antenaCategoria, antenaStatus, antenaTipo } from "../../repositories/interfaces/antena/antena-repository";


interface UpdateAntenaRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: antenaCategoria;
  status?: antenaStatus;
  gain?: string;
  tipos_antena?: antenaTipo;
  posicao_torre?: number;
  vr?: string;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateAntenaService {

  constructor(
    private antenaRepository: AntenaRepository
  ) {}

  async execute(request: UpdateAntenaRequest) {
    const {id,codigo,marca,modelo, categoria,status,gain,tipos_antena,posicao_torre,vr,tipo_equipamento,station_id} = request;

    const antena = await this.antenaRepository.find({id});

    if(!antena) {
      return new Error("Antena inexistente!")
    }

    const status_anterior = Object(antena).status;

    try {
      return await this.antenaRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        gain,
        tipos_antena,
        posicao_torre,
        vr,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}