export type caboCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type caboStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";
export type tiposCabos = "C_7_8" | "C_15_8" | "C_31_8"

export interface CaboCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: caboCategoria;
  status: caboStatus;
  tipos_cabo: tiposCabos;
  tamanho: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface CaboFind {
  id: string;
}

export interface CaboDelete { 
  id: string;
}

export interface CaboUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: caboCategoria;
  status?: caboStatus;
  tipos_cabo?: tiposCabos;
  tamanho?: number;
  tipo_equipamento?: string;
  station_id?: string;
}

export interface CaboFindByCodigo {
  codigo: string;
}

export interface CaboRepository {
  create: (data: CaboCreateData) => Promise<Object | null>
  get: () => Promise<Object>
  find: (data: CaboFind) => Promise<Object | null>
  findByCodigo: (data: CaboFindByCodigo) => Promise<Object | null>
  delete: (data: CaboDelete) => Promise<void>
  update: (data: CaboUpdate) => Promise<void>
}