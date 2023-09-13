import { ChecklistRepository } from "../../repositories/interfaces/checklist/checklist-repository";

export class GetChecklistService {

  constructor(
    private checklistRepository: ChecklistRepository
  ){}

  async execute() {
    const checklist = await this.checklistRepository.get();

    if(Object.keys(checklist).length == 0) {
      return new Error("Nenhum checklist cadastrado!")
    }

    try {
      return checklist
    } catch (error) {
      return error
    }
  }
}