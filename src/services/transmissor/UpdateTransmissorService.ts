import { TransmissorRepository, transmissorCategoria, transmissorStatus } from "../../repositories/interfaces/transmissor/transmissor-repository";

interface UpdateTransmissorRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: transmissorCategoria;
  status?: transmissorStatus;
  status_anterior?: transmissorStatus;
  programmed?:number;
  canal_fisico?: number;
  canal_virtual?: number;
  acoplador_one?: string;
  acoplador_two?: string;
  tipo_equipamento?: string;
  receptor?: string;
  antena?: string;
  station_id?: string;
}

export class UpdateTransmissorService {

  constructor(
    private transmissorRepository: TransmissorRepository
  ) {}

  async execute(request: UpdateTransmissorRequest) {
    const { id ,codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, receptor, antena, tipo_equipamento, station_id } = request;

    const transmissor = await this.transmissorRepository.find({id});

    if(!transmissor) {
      return new Error("Transmissor inexistente!")
    }


    const status_anterior = Object(transmissor).status;

    try {
      return await this.transmissorRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        programmed,
        canal_fisico,
        canal_virtual,
        acoplador_one,
        acoplador_two,
        receptor,
        antena,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}