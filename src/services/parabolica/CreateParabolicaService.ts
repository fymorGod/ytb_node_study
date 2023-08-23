import { ParabolicaRepository, parabolicaCategoria, parabolicaStatus } from "../../repositories/interfaces/parabolica/parabolica-repository";


interface CreateParabolicaRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: parabolicaCategoria;
  status: parabolicaStatus;
  diametro: number;
  satelite: string;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateParabolicaService {
  constructor(
    private parabolicaRepository: ParabolicaRepository
  ) {}

  async execute(request: CreateParabolicaRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, diametro, satelite, tipo_equipamento, station_id }= request;

    try {
      return await this.parabolicaRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         diametro,
         satelite,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}