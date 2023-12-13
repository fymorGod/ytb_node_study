import { Checklist, ManutencaoRepository, statusManutencao, tipoManutencao } from "../../repositories/interfaces/manutencao/manutencao-repository";


interface CreateManutencaoRequest {
  dataCreate: string;
  tipo: tipoManutencao;
  userId: string;
  stationId: string;
  checklist: Checklist[] 
  observacao?: string
  status: statusManutencao
}

export class CreateManutencaoService {
  constructor(
    private manutencaoRepository: ManutencaoRepository
  ) {}

  async execute(request: CreateManutencaoRequest) {
    
    //Dados do service
    const { dataCreate, tipo, checklist, observacao, stationId, status, userId }= request;
    
    try {
      return await this.manutencaoRepository.create({
        checklist,
        dataCreate,
        observacao,
        stationId,
        status,
        tipo,
        userId
      })
    } catch (error) {
      return error
    }
  }
}