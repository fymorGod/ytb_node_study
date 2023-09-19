import { DisjuntorRepository, disjuntorCategoria, disjuntorStatus } from "../../repositories/interfaces/disjuntor/disjuntor-repository";


interface CreateDisjuntorRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: disjuntorCategoria;
  status: disjuntorStatus;
  corrente_maxima: number;
  quadro?: string;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateDisjuntorService {
  constructor(
    private disjuntorRepository: DisjuntorRepository
  ) {}

  async execute(request: CreateDisjuntorRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, corrente_maxima, quadro, tipo_equipamento, station_id }= request;
    if(codigo) {
      if(await this.disjuntorRepository.findByCodigo({ codigo })) {
        return new Error("Disjuntor já existente!")
      }
    }
    try {
      return await this.disjuntorRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         corrente_maxima,
         quadro,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}