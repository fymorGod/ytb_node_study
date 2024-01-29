export type antenaCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type antenaStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";
export type antenaTipo = "OMNIDIRECIONAL" | "DIRETIVA";
export type TypeTorreTipo = "TOPO" | "LATERAL"

export interface AntenaCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: antenaCategoria;
  status: antenaStatus;
  gain: string;
  tipos_antena: antenaTipo;
  posicao_torre: TypeTorreTipo;
  vr: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface AntenaFind {
  id: string;
}

export interface AntenaDelete {
  id: string;
}

export interface AntenaUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: antenaCategoria;
  status?: antenaStatus;
  status_anterior?: antenaStatus;
  gain?: string;
  tipos_antena?: antenaTipo;
  posicao_torre?: TypeTorreTipo;
  vr?: number;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface AntenaFindByCodigo {
  codigo: string;
}
export interface AntenaRepository {
  create: (data: AntenaCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: AntenaFind) => Promise<Object | null>;
  findByCodigo: (data: AntenaFindByCodigo) => Promise<Object | null>
  update: (data: AntenaUpdate) => Promise<Object | null>;
  delete: (data: AntenaDelete) => Promise<void>;
}