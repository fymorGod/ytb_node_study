import { TarefaRepository } from "../../repositories/interfaces/tarefas/tarefa-repository";

interface UpdateTarefaRequest {
  id: string;
  description?: string
  verificado?: boolean
  foto_verificado?: boolean
}

export class UpdateTarefaService {

  constructor(
    private tarefaRepository: TarefaRepository
  ) {}

  async execute(request: UpdateTarefaRequest) {
    const { id, description, verificado, foto_verificado} = request;

    const tarefa = await this.tarefaRepository.find({id});

    if(!tarefa) {
      return new Error("Tarefa inexistente!")
    }

    try {
      return await this.tarefaRepository.update({
        id,
        description,
        verificado,
        foto_verificado
      })
    } catch (error) {
      return error
    }
  }
}