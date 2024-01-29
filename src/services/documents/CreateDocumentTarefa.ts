import { DocumentTarefaRepository } from "../../repositories/interfaces/documentos/documentos_tarefa-repository";

interface CreateDocument_TarefaRequest {
  documentoId: string;
  tarefaId: string;
}

export class CreateDocument_TarefaService {
  constructor(
    private documentTarefaRepository: DocumentTarefaRepository
  ){}

  async execute(request: CreateDocument_TarefaRequest) {
    
    const { documentoId, tarefaId } = request;

    try {
      await this.documentTarefaRepository.create({
        documentoId,
        tarefaId
      })
    } catch (err) {
      return err;
    }
  }
}