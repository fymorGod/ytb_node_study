export type stationStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";
export interface StationCreateData {
  name: string
  latitude: string
  longitude: string
  address: string
  link_grafana: string
  status: stationStatus
  manutencaoId?: string
}

export interface StationFind {
  id: string;
}

export interface StationDelete {
  id: string;
}

export interface StationUpdate {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  link_grafana?: string;
  status?: stationStatus
  status_anterior?: stationStatus
  manutencaoId?: string
}

export interface StationFindByName {
  name: string;
}
export interface StationRepository {
  create: (data: StationCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: StationFind) => Promise<Object | null>;
  findByName: (data: StationFindByName) => Promise<Object | null>
  update: (data: StationUpdate) => Promise<void>;
  delete: (data: StationDelete) => Promise<void>;
}