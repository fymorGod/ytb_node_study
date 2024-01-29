export interface DocumentNobreakCreateData {
  documentoId: string;
  nobreakId: string;
}

export interface DocumentNobreakFind {
  id: string;
}

export interface DocumentNobreakDelete {
  id: string;
}

export interface DocumentNobreakRepository {
  create: (data: DocumentNobreakCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentNobreakFind) => Promise<Object | null>
  delete: (data: DocumentNobreakDelete) => Promise<void>
}