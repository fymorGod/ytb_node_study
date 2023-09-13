import { TarefaRepository } from "../../repositories/interfaces/tarefas/tarefa-repository";

interface CreateTarefaRequest {
  description: string;
  verificado: boolean;
  foto_verificado: boolean;
}

export class CreateTarefaService {
  constructor(
    private tarefaRepository: TarefaRepository
  ) {}

  async execute(request: CreateTarefaRequest) {
    
    //Dados do service
    const { description, verificado, foto_verificado }= request;

    try {
      return await this.tarefaRepository.create({
        description,
        verificado,
        foto_verificado
      })
    } catch (error) {
      return error
    }
  }
}