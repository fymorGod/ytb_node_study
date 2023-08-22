import { ExaustorRepository } from "../../repositories/interfaces/exaustor/exaustor-repository";

interface FindExaustorRequest {
  id: string;
}

export class FindExaustorService {
  constructor(
    private exaustorRepository: ExaustorRepository
  ) {}

  async execute(request: FindExaustorRequest) {

    const { id } = request;

    const exaustor = await this.exaustorRepository.find({ id });

    if(!exaustor) {
      return new Error("Exaustor inexistente!")
    }
    try {
      return exaustor
    } catch (error) {
      return error
    }
  }
}