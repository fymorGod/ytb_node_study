import { TarefaRepository } from "../../repositories/interfaces/tarefas/tarefa-repository";

export class GetTarefaService {

  constructor(
    private tarefaRepository: TarefaRepository
  ){}

  async execute() {

    const tarefa = await this.tarefaRepository.get();

    if(Object.keys(tarefa).length == 0) {
      return new Error("Nenhuma tarefa cadastrada!")
    }

    try {
      return tarefa
    } catch (error) {
      return error
    }
  }
}