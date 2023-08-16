// Camada de interfaces para o fluxo de persistência no banco de dados

export type arcCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type arcStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";

export interface ArcondicionadoCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: arcCategoria;
  status: arcStatus;
  potencia: number;
  tensao: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface ArcondicionadoFind {
  id: string;
}

export interface ArcondicionadoDelete {
  id: string;
}

export interface ArcondicionadoUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: arcCategoria;
  status?: arcStatus;
  status_anterior?: arcStatus;
  potencia?: number;
  tensao?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export interface ArcondicionadoFindByCodigo {
  codigo: string;
}

export interface ArcondicionadoRepository {
  create: (data: ArcondicionadoCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: ArcondicionadoFind) => Promise<Object | null>;
  findByCodigo: (data: ArcondicionadoFindByCodigo) => Promise<Object | null>;
  update: (data: ArcondicionadoUpdate) => Promise<void>;
  delete: (data: ArcondicionadoDelete) => Promise<void>;
}