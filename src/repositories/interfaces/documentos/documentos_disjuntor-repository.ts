export interface DocumentDisjuntorCreateData {
  documentoId: string;
  disjuntorId: string;
}

export interface DocumentDisjuntorFind {
  id: string;
}

export interface DocumentDisjuntorDelete {
  id: string;
}

export interface DocumentDisjuntorRepository {
  create: (data: DocumentDisjuntorCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentDisjuntorFind) => Promise<Object | null>
  delete: (data: DocumentDisjuntorDelete) => Promise<void>
}