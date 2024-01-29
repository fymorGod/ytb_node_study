export interface DocumentParabolicaCreateData {
  documentoId: string;
  parabolicaId: string;
}

export interface DocumentParabolicaFind {
  id: string;
}

export interface DocumentParabolicaDelete {
  id: string;
}

export interface DocumentParabolicaRepository {
  create: (data: DocumentParabolicaCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentParabolicaFind) => Promise<Object | null>
  delete: (data: DocumentParabolicaDelete) => Promise<void>
}