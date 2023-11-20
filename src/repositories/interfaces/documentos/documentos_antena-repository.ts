export interface DocumentAntenaCreateData {
  id_doc: string;
  antenaId: string;
}

export interface DocumentAntenaFind {
  id: string;
}

export interface DocumentAntenaDelete {
  id: string;
}

export interface DocumentAntenaRepository {
  create: (data: DocumentAntenaCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentAntenaFind) => Promise<Object | null>
  delete: (data: DocumentAntenaDelete) => Promise<void>
}