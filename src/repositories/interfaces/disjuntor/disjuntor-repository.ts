export type disjuntorCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type disjuntorStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";

export interface DisjuntorCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: disjuntorCategoria;
  status: disjuntorStatus;
  quadro?: string;
  corrente_maxima: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface DisjuntorFind {
  id: string;
}

export interface DisjuntorDelete {
  id: string;
}

export interface DisjuntorUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: disjuntorCategoria;
  status?: disjuntorStatus;
  status_anterior?: disjuntorStatus;
  quadro?: string;
  corrente_maxima?: number;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface DisjuntorFindByCodigo {
  codigo: string;
}

export interface DisjuntorRepository {
  create: (data: DisjuntorCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: DisjuntorFind) => Promise<Object | null>;
  findByCodigo: (data: DisjuntorFindByCodigo) => Promise<Object | null>
  update: (data: DisjuntorUpdate) => Promise<void>;
  delete: (data: DisjuntorDelete) => Promise<void>;
}