
import { ArcondicionadoRepository, arcCategoria, arcStatus } from "../../repositories/interfaces/arcondicionado/arcondicionado-repository";

interface UpdateArcondicionadoRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: arcCategoria;
  status?: arcStatus;
  potencia?: number;
  tensao?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateArcondicionadoService {
  constructor(
    private arcondicionadoRepository: ArcondicionadoRepository
  ) {}

  async execute(request: UpdateArcondicionadoRequest) {
    const { id, codigo, marca, modelo, categoria, status, potencia, tensao,tipo_equipamento,station_id } = request;
    const arcondicionado = await this.arcondicionadoRepository.find({ id });

    if(!arcondicionado) {
      return new Error("Arcondicionado inexistente!")
    }

    if(codigo){
      if(await this.arcondicionadoRepository.findByCodigo({ codigo })) {
        return new Error("Arcondicionado com este codigo já existe!")
      }
    }

    const status_anterior = Object(arcondicionado).status;

    try {
      return await this.arcondicionadoRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        potencia,
        tensao,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error;
    }

  }
}