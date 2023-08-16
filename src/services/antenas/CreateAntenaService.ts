import { AntenaRepository, antenaCategoria, antenaStatus, antenaTipo } from "../../repositories/interfaces/antena/antena-repository";



interface CreateAntenaRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: antenaCategoria;
  status: antenaStatus;
  gain: string;
  tipos_antena: antenaTipo;
  posicao_torre: number;
  vr: string;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateAntenaService {
  constructor(
    private antenaRepository: AntenaRepository
  ) {}

  async execute(request: CreateAntenaRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, tipo_equipamento, station_id }= request;

    try {
      return await this.antenaRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         gain,
         tipos_antena,
         posicao_torre,
         vr,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}