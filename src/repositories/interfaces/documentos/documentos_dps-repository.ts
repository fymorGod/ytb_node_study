export interface DocumentDpsCreateData {
  documentoId: string;
  dpsId: string;
}

export interface DocumentDpsFind {
  id: string;
}

export interface DocumentDpsDelete {
  id: string;
}

export interface DocumentDpsRepository {
  create: (data: DocumentDpsCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentDpsFind) => Promise<Object | null>
  delete: (data: DocumentDpsDelete) => Promise<void>
}