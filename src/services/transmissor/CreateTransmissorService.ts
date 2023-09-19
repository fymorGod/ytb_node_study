import { TransmissorRepository, transmissorCategoria, transmissorStatus } from "../../repositories/interfaces/transmissor/transmissor-repository";


interface CreateTransmissorRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: transmissorCategoria;
  status: transmissorStatus;
  programmed: number;
  canal_fisico: number;
  canal_virtual: number;
  acoplador_one?: string;
  acoplador_two?: string;
  tipo_equipamento: string;
  receptor?: string;
  antena?: string;
  station_id?: string;
}

export class CreateTransmissorService {
  constructor(
    private transmissorRepository: TransmissorRepository
  ) {}

  async execute(request: CreateTransmissorRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, receptor, antena, tipo_equipamento, station_id }= request;
    if(codigo) {
      if(await this.transmissorRepository.findByCodigo({ codigo })) {
        return new Error("Transmissor já existente!")
      }
    }
    try {
      return await this.transmissorRepository.create({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        programmed,
        canal_fisico,
        canal_virtual,
        acoplador_one,
        acoplador_two,
        receptor,
        antena,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error
    }
  }
}