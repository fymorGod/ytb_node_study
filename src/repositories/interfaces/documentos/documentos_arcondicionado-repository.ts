export interface DocumentArcondicionadoCreateData {
  documentoId: string;
  arcondicionadoId: string;
}

export interface DocumentArcondicionadoFind {
  id: string;
}

export interface DocumentArcondicionadoDelete {
  id: string;
}

export interface DocumentArcondicionadoRepository {
  create: (data: DocumentArcondicionadoCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentArcondicionadoFind) => Promise<Object | null>
  delete: (data: DocumentArcondicionadoDelete) => Promise<void>
}