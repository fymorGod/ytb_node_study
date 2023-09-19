
import { ExaustorRepository, exaustorCategoria, exaustorStatus } from "../../repositories/interfaces/exaustor/exaustor-repository";

interface CreateExaustorRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: exaustorCategoria;
  status: exaustorStatus;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateExaustorService {
  constructor(
    private exaustorRepository: ExaustorRepository
  ) {}

  async execute(request: CreateExaustorRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, tipo_equipamento, station_id}= request;
    if(codigo) {
      if(await this.exaustorRepository.findByCodigo({ codigo })) {
        return new Error("Exaustor já existente!")
      }
    }

    try {
      return await this.exaustorRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}