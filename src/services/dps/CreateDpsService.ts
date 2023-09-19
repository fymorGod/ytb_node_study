import { DpsRepository, classDps, dpsCategoria, dpsStatus } from "../../repositories/interfaces/dps/dps-repository";

interface CreateDpsRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: dpsCategoria;
  status: dpsStatus;
  classe_dps: classDps;
  corrente_maxima: number;
  quadro?: string;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateDpsService {
  constructor(
    private dpsRepository: DpsRepository
  ) {}

  async execute(request: CreateDpsRequest) {
    
    //Dados do service
    const {  codigo, marca, modelo, categoria, status, corrente_maxima, classe_dps, quadro, tipo_equipamento, station_id }= request;
    if(codigo) {
      if(await this.dpsRepository.findByCodigo({ codigo })) {
        return new Error("Dps já existente!")
      }
    }
    try {
      return await this.dpsRepository.create({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        corrente_maxima,
        classe_dps,
        quadro,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error
    }
  }
}