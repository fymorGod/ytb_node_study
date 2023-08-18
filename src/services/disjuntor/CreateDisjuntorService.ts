import { DisjuntorRepository, disjuntorCategoria, disjuntorStatus } from "../../repositories/interfaces/disjuntor/disjuntor-repository";


interface CreateDisjuntorRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: disjuntorCategoria;
  status: disjuntorStatus;
  corrente_maxima: number;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateDisjuntorService {
  constructor(
    private disjuntorRepository: DisjuntorRepository
  ) {}

  async execute(request: CreateDisjuntorRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, corrente_maxima, tipo_equipamento, station_id }= request;

    try {
      return await this.disjuntorRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         corrente_maxima,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}