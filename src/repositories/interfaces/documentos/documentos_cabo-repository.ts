export interface DocumentCaboCreateData {
  documentoId: string;
  caboId: string;
}

export interface DocumentCaboFind {
  id: string;
}

export interface DocumentCaboDelete {
  id: string;
}

export interface DocumentCaboRepository {
  create: (data: DocumentCaboCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentCaboFind) => Promise<Object | null>
  delete: (data: DocumentCaboDelete) => Promise<void>
}