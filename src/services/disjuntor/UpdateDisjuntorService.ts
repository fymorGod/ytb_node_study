import { DisjuntorRepository, disjuntorCategoria, disjuntorStatus } from "../../repositories/interfaces/disjuntor/disjuntor-repository";

interface UpdateDisjuntorRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: disjuntorCategoria;
  status?: disjuntorStatus;
  corrente_maxima?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateDisjuntorService {

  constructor(
    private disjuntorRepository: DisjuntorRepository
  ) {}

  async execute(request: UpdateDisjuntorRequest) {
    const {id,codigo,marca,modelo, categoria,status, corrente_maxima, tipo_equipamento,station_id} = request;

    const disjuntores = await this.disjuntorRepository.find({id});

    if(!disjuntores) {
      return new Error("Disjuntor inexistente!")
    }


    const status_anterior = Object(disjuntores).status;

    try {
      return await this.disjuntorRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        corrente_maxima,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}