export type exaustorCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type exaustorStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";


export interface ExaustorCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: exaustorCategoria;
  status: exaustorStatus
  tipo_equipamento: string;
  station_id?: string;
}

export interface ExaustorFind {
  id: string;
}

export interface ExaustorDelete {
  id: string;
}

export interface ExaustorUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: exaustorCategoria;
  status?: exaustorStatus;
  status_anterior?: exaustorStatus;
  tipo_equipamento?: string;
  station_id?: string;
}
export interface ExaustorFindByCodigo {
  codigo: string;
}
export interface ExaustorRepository {
  create: (data: ExaustorCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: ExaustorFind) => Promise<Object | null>;
  findByCodigo: (data: ExaustorFindByCodigo) => Promise<Object | null>
  update: (data: ExaustorUpdate) => Promise<Object | null>;
  delete: (data: ExaustorDelete) => Promise<void>;
}