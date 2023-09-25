import { TorreRepository, torreCategoria, torreStatus, torreTipo } from "../../repositories/interfaces/torre/torre-repository";


interface UpdateTorreRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: torreCategoria;
  status?: torreStatus;
  tipo_torre?: torreTipo;
  aterramento?: boolean;
  altura?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateTorreService {

  constructor(
    private torreRepository: TorreRepository
  ) {}

  async execute(request: UpdateTorreRequest) {
    const {id, codigo, marca,modelo, categoria, status, tipo_torre, aterramento, altura, tipo_equipamento, station_id} = request;

    const torre = await this.torreRepository.find({id});

    if(!torre) {
      return new Error("Torre inexistente!")
    }



    const status_anterior = Object(torre).status;

    try {
      return await this.torreRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        tipo_torre,
        aterramento,
        altura,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error
    }
  }
}