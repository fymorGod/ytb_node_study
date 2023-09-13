import { ChecklistRepository } from "../../repositories/interfaces/checklist/checklist-repository";

interface FindChecklistRequest {
  id: string;
}

export class FindChecklistService {
  constructor(
    private checklistsRepository: ChecklistRepository
  ) {}

  async execute(request: FindChecklistRequest) {

    const { id } = request;

    const checklist = await this.checklistsRepository.find({ id });

    if(!checklist) {
      return new Error("Checklist inexistente!")
    }
    try {
      return checklist
    } catch (error) {
      return error
    }
  }
}