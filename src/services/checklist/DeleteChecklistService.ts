import { ChecklistRepository } from "../../repositories/interfaces/checklist/checklist-repository";

interface DeleteChecklistRequest {
  id: string;
}

export class DeleteChecklistService {

  constructor(
    private checklistRepository: ChecklistRepository
  ) {}

  async execute(request: DeleteChecklistRequest) {

    const { id } = request;

    const checklist = await this.checklistRepository.find({ id });

    if(!checklist) {
      return new Error("Checklist inexistente!")
    }

    try {
      await this.checklistRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}