import { DocumentAntenaRepository } from "../../repositories/interfaces/documentos/documentos_antena-repository";

interface CreateDocument_AntenaRequest {
  id_doc: string;
  antenaId: string;
}

export class CreateDocument_AntenaService {
  constructor(
    private documentAntenaRepository: DocumentAntenaRepository
  ){}

  async execute(request: CreateDocument_AntenaRequest) {
    
    const { id_doc, antenaId } = request;

    try {
      await this.documentAntenaRepository.create({
        id_doc,
        antenaId
      })
    } catch (err) {
      return err;
    }
  }
}