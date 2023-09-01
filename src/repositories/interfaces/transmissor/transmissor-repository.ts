export type transmissorCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type transmissorStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";


export interface TransmissorCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: transmissorCategoria;
  status: transmissorStatus;
  programmed: number;
  canal_fisico: number;
  canal_virtual: number;
  acoplador_one?: string;
  acoplador_two?: string;
  tipo_equipamento: string;
  receptor?: string;
  antena?: string;
  station_id?: string;
}

export interface TransmissorFind {
  id: string;
}

export interface TransmissorDelete {
  id: string;
}

export interface TransmissorUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: transmissorCategoria;
  status?: transmissorStatus;
  status_anterior?: transmissorStatus;
  programmed?:number;
  canal_fisico?: number;
  canal_virtual?: number;
  acoplador_one?: string;
  acoplador_two?: string;
  tipo_equipamento?: string;
  receptor?: string;
  antena?: string;
  station_id?: string;
}
export interface TransmissorFindByCodigo {
  codigo: string;
}
export interface TransmissorRepository {
  create: (data: TransmissorCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: TransmissorFind) => Promise<Object | null>;
  findByCodigo: (data: TransmissorFindByCodigo) => Promise<Object | null>
  update: (data: TransmissorUpdate) => Promise<void>;
  delete: (data: TransmissorDelete) => Promise<void>;
}