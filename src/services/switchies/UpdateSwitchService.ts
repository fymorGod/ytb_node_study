import { SwitchRepository, switchCategoria, switchStatus } from "../../repositories/interfaces/switchies/switchies-repository";


interface UpdateSwitchRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: switchCategoria;
  status?: switchStatus;
  qtd_portas?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateSwitchService {

  constructor(
    private switchRepository: SwitchRepository
  ) {}

  async execute(request: UpdateSwitchRequest) {
    const { id, codigo, marca, modelo, categoria, status, qtd_portas, tipo_equipamento, station_id } = request;

    const switchies = await this.switchRepository.find({id});

    if(!switchies) {
      return new Error("Switch inexistente!")
    }


    const status_anterior = Object(switchies).status;

    try {
      return await this.switchRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        qtd_portas,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}