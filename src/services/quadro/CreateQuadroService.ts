import { QuadroRepository, quadroCategoria, quadroStatus } from "../../repositories/interfaces/quadro/quadro-repository";


interface CreateQuadroRequest {
  codigo: string;
  categoria: quadroCategoria;
  status: quadroStatus;
  dps?: string;
  disjuntor?: string;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateQuadroService {
  constructor(
    private quadroRepository: QuadroRepository
  ) {}

  async execute(request: CreateQuadroRequest) {
    
    //Dados do service
    const { codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id }= request;

    try {
      return await this.quadroRepository.create({
        codigo,
        categoria,
        status,
        dps,
        disjuntor,
        tipo_equipamento,
        station_id
      })
    } catch (error) {
      return error
    }
  }
}