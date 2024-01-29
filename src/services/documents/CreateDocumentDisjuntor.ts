import { DocumentDisjuntorRepository } from "../../repositories/interfaces/documentos/documentos_disjuntor-repository";

interface CreateDocument_DisjuntorRequest {
  documentoId: string;
  disjuntorId: string;
}

export class CreateDocument_DisjuntorService {
  constructor(
    private documentDisjuntorRepository: DocumentDisjuntorRepository
  ){}

  async execute(request: CreateDocument_DisjuntorRequest) {
    
    const { documentoId, disjuntorId } = request;

    try {
      await this.documentDisjuntorRepository.create({
        documentoId,
        disjuntorId
      })
    } catch (err) {
      return err;
    }
  }
}