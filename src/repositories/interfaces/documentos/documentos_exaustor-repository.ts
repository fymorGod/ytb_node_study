export interface DocumentExaustorCreateData {
  documentoId: string;
  exaustorId: string;
}

export interface DocumentExaustorFind {
  id: string;
}

export interface DocumentExaustorDelete {
  id: string;
}

export interface DocumentExaustorRepository {
  create: (data: DocumentExaustorCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentExaustorFind) => Promise<Object | null>
  delete: (data: DocumentExaustorDelete) => Promise<void>
}