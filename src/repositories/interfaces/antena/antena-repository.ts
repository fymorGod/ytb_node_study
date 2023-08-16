
export interface AntenaCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: string;
  status: string;
  gain: string;
  tipos_antena: string;
  posicao_torre: number;
  vr: string;
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
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: string;
  status?: string;
  gain?: string;
  tipos_antena?: string;
  posicao_torre?: number;
  vr?: string;
  tipo_equipamento?: string;
  station_id?: string;
}

export interface AntenaRepository {
  create: (data: AntenaCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: AntenaFind) => Promise<Object | null>;
  update: (data: AntenaUpdate) => Promise<void>;
  delete: (data: AntenaDelete) => Promise<void>;
}