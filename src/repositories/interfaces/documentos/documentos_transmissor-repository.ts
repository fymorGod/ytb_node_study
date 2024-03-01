export interface DocumentTransmissorCreateData {
  documentoId: string;
  transmissorId: string;
}

export interface DocumentTransmissorFind {
  id: string;
}

export interface DocumentTransmissorDelete {
  id: string;
}

export interface DocumentTransmissorRepository {
  create: (data: DocumentTransmissorCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentTransmissorFind) => Promise<Object | null>
  delete: (data: DocumentTransmissorDelete) => Promise<void>
}