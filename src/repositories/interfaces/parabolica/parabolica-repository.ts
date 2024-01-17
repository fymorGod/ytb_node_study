export type parabolicaCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type parabolicaStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";


export interface ParabolicaCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: parabolicaCategoria;
  status: parabolicaStatus;
  diametro: number;
  satelite: string;
  tipo_equipamento: string;
  station_id?: string;
}

export interface ParabolicaFind {
  id: string;
}

export interface ParabolicaDelete {
  id: string;
}

export interface ParabolicaUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: parabolicaCategoria;
  status?: parabolicaStatus;
  status_anterior?: parabolicaStatus;
  diametro?: number;
  satelite?: string;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface ParabolicaFindByCodigo {
  codigo: string;
}
export interface ParabolicaRepository {
  create: (data: ParabolicaCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: ParabolicaFind) => Promise<Object | null>;
  findByCodigo: (data: ParabolicaFindByCodigo) => Promise<Object | null>
  update: (data: ParabolicaUpdate) => Promise<void>;
  delete: (data: ParabolicaDelete) => Promise<void>;
}