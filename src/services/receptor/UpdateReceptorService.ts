import { ReceptorRepository, receptorCategoria, receptorStatus } from "../../repositories/interfaces/receptor/receptor-repository";


interface UpdateReceptorRequest {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: receptorCategoria;
  status?: receptorStatus;
  frequencia?: number;
  symbol_rate?: number;
  channel?: number;
  tipo_equipamento?: string;
  parabolica?: string;
  station_id?: string;
}

export class UpdateReceptorService {

  constructor(
    private receptorRepository: ReceptorRepository
  ) {}

  async execute(request: UpdateReceptorRequest) {
    const {id,  codigo, marca, modelo, categoria, status, frequencia, symbol_rate, tipo_equipamento, parabolica, station_id} = request;

    const receptor = await this.receptorRepository.find({id});

    if(!receptor) {
      return new Error("Receptor inexistente!")
    }
    if(codigo) {
      if(await this.receptorRepository.findByCodigo({ codigo })) {
        return new Error("Receptor já existente!")
      }
    }

    const status_anterior = Object(receptor).status;

    try {
      return await this.receptorRepository.update({
        id,
        codigo,
        marca,
        modelo,
        categoria,
        status,
        status_anterior,
        frequencia,
        symbol_rate,
        tipo_equipamento,
        parabolica,
        station_id,
      })
    } catch (error) {
      return error
    }
  }
}