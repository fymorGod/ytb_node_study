import { CaboRepository, caboCategoria, caboStatus, tiposCabos } from "../../repositories/interfaces/cabo/cabo-repository";


interface CreateCaboRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: caboCategoria;
  status: caboStatus;
  tipos_cabo: tiposCabos;
  tamanho: number;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateCaboService {

  constructor(
    private caboRepository: CaboRepository
  ) {}

  async execute(request: CreateCaboRequest) {
    const { codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, tipo_equipamento, station_id } = request;
    if(codigo) {
      if(await this.caboRepository.findByCodigo({ codigo })) {
        return new Error("Código já existente!")
      }
    }
    try {
      return await this.caboRepository.create({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        tipos_cabo,
        tamanho,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error;
    }
  }
}