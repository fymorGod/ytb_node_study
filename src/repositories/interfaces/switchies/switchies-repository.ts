export type switchCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type switchStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";

export interface SwitchCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: switchCategoria;
  status: switchStatus;
  qtd_portas: number;
  tipo_equipamento: string;
  station_id?: string;
}

export interface SwitchFind {
  id: string;
}

export interface SwitchDelete {
  id: string;
}

export interface SwitchUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: switchCategoria;
  status?: switchStatus;
  status_anterior?: switchStatus;
  qtd_portas?: number;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface SwitchFindByCodigo {
  codigo: string;
}
export interface SwitchRepository {
  create: (data: SwitchCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: SwitchFind) => Promise<Object | null>;
  findByCodigo: (data: SwitchFindByCodigo) => Promise<Object | null>
  update: (data: SwitchUpdate) => Promise<void>;
  delete: (data: SwitchDelete) => Promise<void>;
}