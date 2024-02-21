export type combinadorCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type combinadorStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";

export interface CombinadorCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: combinadorCategoria;
  status: combinadorStatus
  tipo_equipamento: string;
  station_id?: string;
}

export interface CombinadorUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: combinadorCategoria;
  status?: combinadorStatus;
  status_anterior?: string;
  tipo_equipamento?: string;
  station_id?: string;
}

export interface CombinadorFind {
  id: string;
}

export interface CombinadorDelete {
  id: string;
}

export interface CombinadorFindByCodigo {
  codigo: string;
}

export interface CombinadorRepository {
  create: (data: CombinadorCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: CombinadorFind) => Promise<Object | null>;
  findByCodigo: (data: CombinadorFindByCodigo) => Promise<Object | null>
  update: (data: CombinadorUpdate) => Promise<Object | null>;
  delete: (data: CombinadorDelete) => Promise<void>;
}