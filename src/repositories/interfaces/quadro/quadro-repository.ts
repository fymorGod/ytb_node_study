export type quadroCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type quadroStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";


export interface QuadroCreateData {
  codigo: string;
  categoria: quadroCategoria;
  status: quadroStatus;
  dps?: string;
  disjuntor?: string;
  tipo_equipamento: string;
  station_id?: string;
}

export interface QuadroFind {
  id: string;
}

export interface QuadroDelete {
  id: string;
}

export interface QuadroUpdate {
  id: string;
  codigo?: string;
  categoria?: quadroCategoria;
  status?: quadroStatus;
  status_anterior?: quadroStatus;
  dps?: string;
  disjuntor?: string;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface QuadroFindByCodigo {
  codigo: string;
}
export interface QuadroRepository {
  create: (data: QuadroCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: QuadroFind) => Promise<Object | null>;
  findByCodigo: (data: QuadroFindByCodigo) => Promise<Object | null>
  update: (data: QuadroUpdate) => Promise<Object | null>;
  delete: (data: QuadroDelete) => Promise<void>;
}