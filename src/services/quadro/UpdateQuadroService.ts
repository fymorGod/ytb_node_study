import { QuadroRepository, quadroCategoria, quadroStatus } from "../../repositories/interfaces/quadro/quadro-repository";


interface UpdateQuadroRequest {
  id: string;
  codigo?: string;
  categoria?: quadroCategoria;
  status?: quadroStatus;
  dps?:string;
  disjuntor?: string;
  tipo_equipamento?: string;
  station_id?: string;
}

export class UpdateQuadroService {

  constructor(
    private quadroRepository: QuadroRepository
  ) {}

  async execute(request: UpdateQuadroRequest) {
    const {id, codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id} = request;

    const quadro = await this.quadroRepository.find({id});

    if(!quadro) {
      return new Error("Quadro inexistente!")
    }
    if(codigo) {
      if(await this.quadroRepository.findByCodigo({ codigo })) {
        return new Error("Quadro já existente!")
      }
    }

    const status_anterior = Object(quadro).status;

    try {
      return await this.quadroRepository.update({
        id,
        codigo,
        categoria,
        status,
        status_anterior,
        dps,
        disjuntor,
        tipo_equipamento,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}