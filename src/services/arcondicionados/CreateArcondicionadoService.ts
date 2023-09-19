import { ArcondicionadoRepository, arcCategoria, arcStatus } from "../../repositories/interfaces/arcondicionado/arcondicionado-repository";

interface CreateArcondicionadoRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: arcCategoria;
  status: arcStatus;
  potencia: number;
  tensao: number;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateArcondicionadoService {
  constructor(
    private arcondicionadoRepository: ArcondicionadoRepository
  ) {}

  async execute(request: CreateArcondicionadoRequest) {
    const { codigo, marca, modelo, categoria, status, potencia, tensao, tipo_equipamento, station_id } = request;
    if(codigo){
      if(await this.arcondicionadoRepository.findByCodigo({ codigo })) {
        return new Error("Arcondicionado com este codigo já existe!")
      }
    }

    try {
      return await this.arcondicionadoRepository.create({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        potencia,
        tensao,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error
    }
  }
}