export interface DocumentUserCreateData {
  documentoId: string;
  userId: string;
}

export interface DocumentUserFind {
  id: string;
}

export interface DocumentUserDelete {
  id: string;
}

export interface DocumentUserRepository {
  create: (data: DocumentUserCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentUserFind) => Promise<Object | null>
  delete: (data: DocumentUserDelete) => Promise<void>
}