export interface DocumentTelemetriaCreateData {
  documentoId: string;
  telemetriaId: string;
}

export interface DocumentTelemetriaFind {
  id: string;
}

export interface DocumentTelemetriaDelete {
  id: string;
}

export interface DocumentTelemetriaRepository {
  create: (data: DocumentTelemetriaCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentTelemetriaFind) => Promise<Object | null>
  delete: (data: DocumentTelemetriaDelete) => Promise<void>
}