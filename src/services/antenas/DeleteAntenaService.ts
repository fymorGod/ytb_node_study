import { AntenaRepository } from "../../repositories/interfaces/antena/antena-repository";

interface DeleteAntenaRequest {
  id: string;
}

export class DeleteAntenaService {

  constructor(
    private antenaRepository: AntenaRepository
  ) {}

  async execute(request: DeleteAntenaRequest) {

    const { id } = request;

    const antena = await this.antenaRepository.find({ id });

    if(!antena) {
      return new Error("Antena inexistente!")
    }

    try {
      await this.antenaRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}