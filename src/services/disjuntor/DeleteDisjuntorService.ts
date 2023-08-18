import { DisjuntorRepository } from "../../repositories/interfaces/disjuntor/disjuntor-repository";

interface DeleteDisjuntorRequest {
  id: string;
}

export class DeleteDisjuntorService {

  constructor(
    private disjuntorRepository: DisjuntorRepository
  ) {}

  async execute(request: DeleteDisjuntorRequest) {

    const { id } = request;

    const disjuntores = await this.disjuntorRepository.find({ id });

    if(!disjuntores) {
      return new Error("Antena inexistente!")
    }

    try {
      await this.disjuntorRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}