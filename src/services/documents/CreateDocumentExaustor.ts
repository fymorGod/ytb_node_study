import { DocumentExaustorRepository } from "../../repositories/interfaces/documentos/documentos_exaustor-repository";

interface CreateDocument_ExaustorRequest {
  documentoId: string;
  exaustorId: string;
}

export class CreateDocument_ExaustorService {
  constructor(
    private documentExaustorRepository: DocumentExaustorRepository
  ){}

  async execute(request: CreateDocument_ExaustorRequest) {
    
    const { documentoId, exaustorId } = request;

    try {
      await this.documentExaustorRepository.create({
        documentoId,
        exaustorId
      })
    } catch (err) {
      return err;
    }
  }
}