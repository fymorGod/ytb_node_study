import { NobreakRepository, nobreakCategoria, nobreakStatus } from "../../repositories/interfaces/nobreak/nobreak-repository";


interface UpdateNobreakRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: nobreakCategoria;
  status?: nobreakStatus;
  status_anterior?: nobreakStatus;
  tensao_entrada?: number;
  tensao_saida?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateNobreakService {

  constructor(
    private nobreakRepository: NobreakRepository
  ) {}

  async execute(request: UpdateNobreakRequest) {
    const {id,codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento, station_id } = request;

    const nobreak = await this.nobreakRepository.find({id});

    if(!nobreak) {
      return new Error("Nobreak inexistente!")
    }
    if(codigo) {
      if(await this.nobreakRepository.findByCodigo({ codigo })) {
        return new Error("Antena já existente!")
      }
    }

    const status_anterior = Object(nobreak).status;

    try {
      return await this.nobreakRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        tensao_entrada,
        tensao_saida,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}