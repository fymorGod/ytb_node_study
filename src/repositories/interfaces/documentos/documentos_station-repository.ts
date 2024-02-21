export interface DocumentStationCreateData {
  documentoId: string;
  stationId: string;
}

export interface DocumentStationFind {
  id: string;
}

export interface DocumentStationDelete {
  id: string;
}

export interface DocumentStationRepository {
  create: (data: DocumentStationCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentStationFind) => Promise<Object | null>
  delete: (data: DocumentStationDelete) => Promise<void>
}