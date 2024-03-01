import { DocumentReceptorRepository } from "../../repositories/interfaces/documentos/documentos_receptor-repository";

interface CreateDocument_ReceptorRequest {
  documentoId: string;
  receptorId: string;
}

export class CreateDocument_ReceptorService {
  constructor(
    private documentReceptorRepository: DocumentReceptorRepository
  ){}

  async execute(request: CreateDocument_ReceptorRequest) {
    
    const { documentoId, receptorId } = request;

    try {
      await this.documentReceptorRepository.create({
        documentoId,
        receptorId
      })
    } catch (err) {
      return err;
    }
  }
}