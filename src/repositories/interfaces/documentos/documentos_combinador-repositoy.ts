export interface DocumentCombinadorCreateData {
  documentoId: string;
  combinadorId: string;
}

export interface DocumentCombinadorFind {
  id: string;
}

export interface DocumentCombinadorDelete {
  id: string;
}

export interface DocumentCombinadorRepository {
  create: (data: DocumentCombinadorCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentCombinadorFind) => Promise<Object | null>
  delete: (data: DocumentCombinadorDelete) => Promise<void>
}