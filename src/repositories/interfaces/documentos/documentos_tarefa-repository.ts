export interface DocumentTarefaCreateData {
  documentoId: string;
  tarefaId: string;
}

export interface DocumentTarefaFind {
  id: string;
}

export interface DocumentTarefaDelete {
  id: string;
}

export interface DocumentTarefaRepository {
  create: (data: DocumentTarefaCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentTarefaFind) => Promise<Object | null>
  delete: (data: DocumentTarefaDelete) => Promise<void>
}