export type dpsCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type dpsStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";
export type classDps = "D_1" | "D_2" | "D_3";


export interface DpsCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: dpsCategoria;
  status: dpsStatus;
  classe_dps: classDps;
  corrente_maxima: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface DpsFind {
  id: string;
}

export interface DpsDelete {
  id: string;
}

export interface DpsUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: dpsCategoria;
  status?: dpsStatus;
  status_anterior?: dpsStatus;
  classe_dps?: classDps;
  corrente_maxima?: number;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface DpsFindByCodigo {
  codigo: string;
}
export interface DpsRepository {
  create: (data: DpsCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: DpsFind) => Promise<Object | null>;
  findByCodigo: (data: DpsFindByCodigo) => Promise<Object | null>
  update: (data: DpsUpdate) => Promise<Object | null>;
  delete: (data: DpsDelete) => Promise<void>;
}