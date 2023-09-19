import { ChecklistRepository, TarefaProps } from "../../repositories/interfaces/checklist/checklist-repository";


interface CreateChecklistRequest {
  name: string;
  tarefas: TarefaProps[];
  tipo_equipamento: string;
}

export class CreateChecklistService {
  constructor(
    private checklistRepository: ChecklistRepository
  ) {}

  async execute(request: CreateChecklistRequest) {
    
    //Dados do service
    const { name, tarefas ,tipo_equipamento }= request;
    if(name) {
      if(await this.checklistRepository.find({ name })) {
        return new Error("Checklist já existente!")
      }
    }
    try {
      return await this.checklistRepository.create({
        name,
        tarefas,
        tipo_equipamento,
      })
    } catch (error) {
      return error
    }
  }
}