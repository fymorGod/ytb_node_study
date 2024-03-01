export interface DocumentTorreCreateData {
  documentoId: string;
  torreId: string;
}

export interface DocumentTorreFind {
  id: string;
}

export interface DocumentTorreDelete {
  id: string;
}

export interface DocumentTorreRepository {
  create: (data: DocumentTorreCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentTorreFind) => Promise<Object | null>
  delete: (data: DocumentTorreDelete) => Promise<void>
}