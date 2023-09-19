import { ExaustorRepository, exaustorCategoria, exaustorStatus } from "../../repositories/interfaces/exaustor/exaustor-repository";

interface UpdateExaustorRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: exaustorCategoria;
  status?: exaustorStatus;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateExaustorService {

  constructor(
    private exaustorRepository: ExaustorRepository
  ) {}

  async execute(request: UpdateExaustorRequest) {
    const {id,codigo,marca,modelo, categoria,status,tipo_equipamento,station_id} = request;

    const exaustor = await this.exaustorRepository.find({id});

    if(!exaustor) {
      return new Error("Exaustor inexistente!")
    }

    const status_anterior = Object(exaustor).status;

    try {
      return await this.exaustorRepository.update({
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