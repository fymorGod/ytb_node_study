import { CombinadorRepository, combinadorCategoria, combinadorStatus } from "../../repositories/interfaces/combinador/combinador-repository";

interface UpdateCombinadorRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: combinadorCategoria;
  status?: combinadorStatus;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateCombinadorService {

  constructor(
    private combinadorRepository: CombinadorRepository
  ) {}

  async execute(request: UpdateCombinadorRequest) {
    const {id,codigo,marca,modelo, categoria,status,tipo_equipamento,station_id} = request;

    const combinador = await this.combinadorRepository.find({id});

    if(!combinador) {
      return new Error("Combinador inexistente!")
    }

    const status_anterior = Object(combinador).status;

    try {
      return await this.combinadorRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}