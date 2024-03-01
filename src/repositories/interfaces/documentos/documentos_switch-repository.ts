export interface DocumentSwitchCreateData {
  documentoId: string;
  switchiesId: string;
}

export interface DocumentSwitchFind {
  id: string;
}

export interface DocumentSwitchDelete {
  id: string;
}

export interface DocumentSwitchRepository {
  create: (data: DocumentSwitchCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentSwitchFind) => Promise<Object | null>
  delete: (data: DocumentSwitchDelete) => Promise<void>
}