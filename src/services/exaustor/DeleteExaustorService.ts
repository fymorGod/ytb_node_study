import { ExaustorRepository } from "../../repositories/interfaces/exaustor/exaustor-repository";

interface DeleteExaustorRequest {
  id: string;
}

export class DeleteExaustorService {

  constructor(
    private exaustorRepository: ExaustorRepository
  ) {}

  async execute(request: DeleteExaustorRequest) {

    const { id } = request;

    const exaustor = await this.exaustorRepository.find({ id });

    if(!exaustor) {
      return new Error("Exaustor inexistente!")
    }

    try {
      await this.exaustorRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}