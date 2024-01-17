import { DocumentAntenaRepository } from "../../repositories/interfaces/documentos/documentos_antena-repository";

interface CreateDocument_AntenaRequest {
  documentoId: string;
  antenaId: string;
}

export class CreateDocument_AntenaService {
  constructor(
    private documentAntenaRepository: DocumentAntenaRepository
  ){}

  async execute(request: CreateDocument_AntenaRequest) {
    
    const { documentoId, antenaId } = request;

    try {
      await this.documentAntenaRepository.create({
        documentoId,
        antenaId
      })
    } catch (err) {
      return err;
    }
  }
}