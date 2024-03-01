export interface DocumentReceptorCreateData {
  documentoId: string;
  receptorId: string;
}

export interface DocumentReceptorFind {
  id: string;
}

export interface DocumentReceptorDelete {
  id: string;
}

export interface DocumentReceptorRepository {
  create: (data: DocumentReceptorCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentReceptorFind) => Promise<Object | null>
  delete: (data: DocumentReceptorDelete) => Promise<void>
}