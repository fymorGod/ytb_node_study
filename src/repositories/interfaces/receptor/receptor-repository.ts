export type receptorCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type receptorStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";


export interface ReceptorCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: receptorCategoria;
  status: receptorStatus;
  channel: number;
  frequencia: number;
  symbol_rate: number;
  tipo_equipamento: string;
  parabolica?: string;
  station_id?: string;
}

export interface ReceptorFind {
  id: string;
}

export interface ReceptorDelete {
  id: string;
}

export interface ReceptorUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: receptorCategoria;
  status?: receptorStatus;
  status_anterior?: receptorStatus;
  frequencia?: number;
  symbol_rate?: number;
  channel?: number;
  tipo_equipamento?: string;
  parabolica?: string;
  station_id?: string;
}
export interface ReceptorFindByCodigo {
  codigo: string;
}
export interface ReceptorRepository {
  create: (data: ReceptorCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: ReceptorFind) => Promise<Object | null>;
  findByCodigo: (data: ReceptorFindByCodigo) => Promise<Object | null>
  update: (data: ReceptorUpdate) => Promise<void>;
  delete: (data: ReceptorDelete) => Promise<void>;
}