import { ReceptorRepository } from "../../repositories/interfaces/receptor/receptor-repository";

interface DeleteReceptorRequest {
  id: string;
}

export class DeleteReceptorService {

  constructor(
    private receptorRepository: ReceptorRepository
  ) {}

  async execute(request: DeleteReceptorRequest) {

    const { id } = request;

    const receptor = await this.receptorRepository.find({ id });

    if(!receptor) {
      return new Error("Receptor inexistente!")
    }

    try {
      await this.receptorRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}