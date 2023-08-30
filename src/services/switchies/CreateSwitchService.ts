import { SwitchRepository, switchCategoria, switchStatus } from "../../repositories/interfaces/switchies/switchies-repository";

interface CreateSwitchRequest {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: switchCategoria;
  status: switchStatus;
  qtd_portas: number;
  tipo_equipamento: string;
  station_id?: string;
}

export class CreateSwitchService {
  constructor(
    private switchRepository: SwitchRepository
  ) {}

  async execute(request: CreateSwitchRequest) {
    
    //Dados do service
    const { codigo, marca, modelo, categoria, status, qtd_portas, tipo_equipamento, station_id }= request;

    try {
      return await this.switchRepository.create({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         qtd_portas,
         tipo_equipamento,
         station_id
      })
    } catch (error) {
      return error
    }
  }
}