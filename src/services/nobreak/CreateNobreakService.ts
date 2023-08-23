import { NobreakRepository, nobreakCategoria, nobreakStatus } from "../../repositories/interfaces/nobreak/nobreak-repository";


interface CreateNobreakRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: nobreakCategoria;
  status: nobreakStatus;
  tensao_entrada: number;
  tensao_saida: number;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateNobreakService {
  constructor(
    private nobreakRepository: NobreakRepository
  ) {}

  async execute(request: CreateNobreakRequest) {
    
    //Dados do service
    const {codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento, station_id }= request;

    try {
      return await this.nobreakRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tensao_entrada,
         tensao_saida,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}