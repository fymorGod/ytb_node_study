import { TarefaRepository } from "../../repositories/interfaces/tarefas/tarefa-repository";


interface FindTarefaRequest {
  id: string;
}

export class FindTarefaService {
  constructor(
    private tarefasRepository: TarefaRepository
  ) {}

  async execute(request: FindTarefaRequest) {

    const { id } = request;

    const tarefa = await this.tarefasRepository.find({ id });

    if(!tarefa) {
      return new Error("Tarefa inexistente!")
    }
    try {
      return tarefa
    } catch (error) {
      return error
    }
  }
}