export interface DocumentCreateData {
  path: string;
  filename: string;
  originalName: string;
  fileFormat: string;
}

export interface DocumentFind {
  id: string;
}

export interface DocumentDelete {
  id: string;
}

export interface DocumentRepository {
  create: (data: DocumentCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: DocumentFind) => Promise<Object | null>;
  delete: (data: DocumentDelete) => Promise<void>;
}