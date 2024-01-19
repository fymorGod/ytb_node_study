import { Checklist, ManutencaoRepository, statusManutencao, tipoManutencao } from "../../repositories/interfaces/manutencao/manutencao-repository";

interface UpdateManutencaoRequest {
  id: string;
  tipo: tipoManutencao;
  userId: string;
  stationId: string;
  checklist: Checklist[] 
  observacao: string
  status: statusManutencao
}
export class UpdateManutencaoService {

  constructor(
    private manutencaoRepository: ManutencaoRepository
  ) {}

  async execute(request: UpdateManutencaoRequest) {
    const {id, tipo, checklist, observacao, stationId, status, userId } = request;

    const manutencao = await this.manutencaoRepository.find({id});

    if(!manutencao) {
      return new Error("Manutencao inexistente!")
    }
    

    try {
      return await this.manutencaoRepository.update({
        id,
        checklist,
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