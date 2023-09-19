import { CombinadorRepository, combinadorCategoria, combinadorStatus } from "../../repositories/interfaces/combinador/combinador-repository";

interface CreateCombinadorRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: combinadorCategoria;
  status: combinadorStatus;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateCombinadorService {
  constructor(
    private combinadorRepository: CombinadorRepository
  ) {}

  async execute(request: CreateCombinadorRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, tipo_equipamento, station_id }= request;
    if(codigo) {
      if(await this.combinadorRepository.findByCodigo({ codigo })) {
        return new Error("Combinador já existente!")
      }
    }

    try {
      return await this.combinadorRepository.create({
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