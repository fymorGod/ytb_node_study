import { ChecklistRepository, TarefaProps } from "../../repositories/interfaces/checklist/checklist-repository";

interface UpdateChecklistRequest {
  id: string;
  name: string;
  tarefas: TarefaProps[];
  tipo_equipamento: string;
}

export class UpdateChecklistService {

  constructor(
    private checklistRepository: ChecklistRepository
  ) {}

  async execute(request: UpdateChecklistRequest) {
    const {id, name, tarefas, tipo_equipamento } = request;

    const checklist = await this.checklistRepository.find({id});

    if(!checklist) {
      return new Error("Checklist inexistente!")
    }
    if(id) {
      if(await this.checklistRepository.find({ id })) {
        return new Error("Checklist já existente!")
      }
    }

    try {
      return await this.checklistRepository.update({
        id,
        name,
        tarefas,
        tipo_equipamento
      })
    } catch (error) {
      return error
    }
  }
}