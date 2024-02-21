export type nobreakCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type nobreakStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";


export interface NobreakCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: nobreakCategoria;
  status: nobreakStatus;
  tensao_entrada: number;
  tensao_saida: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface NobreakFind {
  id: string;
}

export interface NobreakDelete {
  id: string;
}

export interface NobreakUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: nobreakCategoria;
  status?: nobreakStatus;
  status_anterior?: nobreakStatus;
  tensao_entrada?: number;
  tensao_saida?: number;
  tipo_equipamento?: string;
  station_id?: string;

}
export interface NobreakFindByCodigo {
  codigo: string;
}
export interface NobreakRepository {
  create: (data: NobreakCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: NobreakFind) => Promise<Object | null>;
  findByCodigo: (data: NobreakFindByCodigo) => Promise<Object | null>
  update: (data: NobreakUpdate) => Promise<Object | null>;
  delete: (data: NobreakDelete) => Promise<void>;
}