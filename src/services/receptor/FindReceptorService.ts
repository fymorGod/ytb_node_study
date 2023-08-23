import { ReceptorRepository } from "../../repositories/interfaces/receptor/receptor-repository";

interface FindReceptorRequest {
  id: string;
}

export class FindReceptorService {
  constructor(
    private receptorsRepository: ReceptorRepository
  ) {}

  async execute(request: FindReceptorRequest) {

    const { id } = request;

    const receptor = await this.receptorsRepository.find({ id });

    if(!receptor) {
      return new Error("Receptor inexistente!")
    }
    try {
      return receptor
    } catch (error) {
      return error
    }
  }
}