export interface DocumentQuadroCreateData {
  documentoId: string;
  quadroId: string;
}

export interface DocumentQuadroFind {
  id: string;
}

export interface DocumentQuadroDelete {
  id: string;
}

export interface DocumentQuadroRepository {
  create: (data: DocumentQuadroCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentQuadroFind) => Promise<Object | null>
  delete: (data: DocumentQuadroDelete) => Promise<void>
}