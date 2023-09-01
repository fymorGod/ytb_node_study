import { ReceptorRepository, receptorCategoria, receptorStatus } from "../../repositories/interfaces/receptor/receptor-repository";

interface CreateReceptorRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: receptorCategoria;
  status: receptorStatus;
  frequencia: number;
  symbol_rate: number;
  channel: number;
  tipo_equipamento: string;
  parabolica?: string;
  station_id?: string;
}

export class CreateReceptorService {
  constructor(
    private receptorRepository: ReceptorRepository
  ) {}

  async execute(request: CreateReceptorRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, frequencia, symbol_rate, channel, tipo_equipamento, parabolica, station_id }= request;

    try {
      return await this.receptorRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         frequencia,
         symbol_rate,
         channel,
         parabolica,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}