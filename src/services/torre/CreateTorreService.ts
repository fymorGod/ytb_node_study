import { TorreRepository, torreCategoria, torreStatus, torreTipo } from "../../repositories/interfaces/torre/torre-repository";


interface CreateTorreRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: torreCategoria;
  status: torreStatus;
  tipo_torre: torreTipo;
  aterramento: boolean;
  altura: number;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateTorreService {
  constructor(
    private torreRepository: TorreRepository
  ) {}

  async execute(request: CreateTorreRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, tipo_torre, aterramento , altura, tipo_equipamento, station_id }= request;
    if(codigo) {
      if(await this.torreRepository.findByCodigo({ codigo })) {
        return new Error("Torre já existente!")
      }
    }
    try {
      return await this.torreRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tipo_torre,
         aterramento,
         altura,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}