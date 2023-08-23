import { TelemetriaRepository, telemetriaCategoria, telemetriaStatus } from "../../repositories/interfaces/telemetria/telemetria-repository";

interface CreateTelemetriaRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: telemetriaCategoria;
  status: telemetriaStatus;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateTelemetriaService {
  constructor(
    private telemetriaRepository: TelemetriaRepository
  ) {}

  async execute(request: CreateTelemetriaRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, tipo_equipamento, station_id }= request;

    try {
      return await this.telemetriaRepository.create({
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