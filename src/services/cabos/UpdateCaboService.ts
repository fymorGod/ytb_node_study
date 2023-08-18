import { CaboRepository, caboCategoria, caboStatus, tiposCabos } from "../../repositories/interfaces/cabo/cabo-repository";


interface UpdateCaboRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: caboCategoria;
  status?: caboStatus;
  tipos_cabo?: tiposCabos;
  tamanho?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateCaboService {
  constructor(
    private caboRepository: CaboRepository
  ) {}

  async execute(request: UpdateCaboRequest) {
    const { id, codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, tipo_equipamento, station_id } = request;  
    
    const cabo = await this.caboRepository.find({ id });

    if(!cabo) {
      return new Error("Cabo inexistente!")
    }

    if(codigo) {
      if(await this.caboRepository.findByCodigo({ codigo })) {
        return new Error("Código já existente!")
      }
    }

    const status_anterior = Object(cabo).status; 

    try {
      return await this.caboRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        tipos_cabo,
        tamanho,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error
    }
  }
}