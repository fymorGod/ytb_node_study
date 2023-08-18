import { DisjuntorRepository } from "../../repositories/interfaces/disjuntor/disjuntor-repository";

interface FindDisjuntorRequest {
  id: string;
}

export class FindDisjuntorService {
  constructor(
    private disjuntorRepository: DisjuntorRepository
  ) {}

  async execute(request: FindDisjuntorRequest) {

    const { id } = request;

    const disjuntores = await this.disjuntorRepository.find({ id });

    if(!disjuntores) {
      return new Error("Disjuntor inexistente!")
    }
    try {
      return disjuntores
    } catch (error) {
      return error
    }
  }
}