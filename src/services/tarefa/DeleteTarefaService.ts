import { TarefaRepository } from "../../repositories/interfaces/tarefas/tarefa-repository";

interface DeleteTarefaRequest {
  id: string;
}

export class DeleteTarefaService {

  constructor(
    private tarefaRepository: TarefaRepository
  ) {}

  async execute(request: DeleteTarefaRequest) {

    const { id } = request;

    const tarefa = await this.tarefaRepository.find({ id });

    if(!tarefa) {
      return new Error("Tarefa inexistente!")
    }

    try {
      await this.tarefaRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}