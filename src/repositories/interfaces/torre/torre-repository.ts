export type torreCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type torreStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";
export type torreTipo = "AUTOPORTANTE" | "ESTAIADA";


export interface TorreCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: torreCategoria;
  status: torreStatus;
  tipo_torre: torreTipo;
  aterramento: boolean;
  altura: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface TorreFind {
  id: string;
}

export interface TorreDelete {
  id: string;
}

export interface TorreUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: torreCategoria;
  status?: torreStatus;
  status_anterior?: torreStatus;
  tipo_torre?: torreTipo;
  aterramento?: boolean;
  altura?: number;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface TorreFindByCodigo {
  codigo: string;
}
export interface TorreRepository {
  create: (data: TorreCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: TorreFind) => Promise<Object | null>;
  findByCodigo: (data: TorreFindByCodigo) => Promise<Object | null>
  update: (data: TorreUpdate) => Promise<void>;
  delete: (data: TorreDelete) => Promise<void>;
}