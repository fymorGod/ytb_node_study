
export interface AntenaCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: antenaCategoria;
  status: antenaStatus;
  gain: string;
  tipos_antena: antenaTipo;
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
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: antenaCategoria;
  status?: antenaStatus;
  status_anterior?: antenaStatus;
  gain?: string;
  tipos_antena?: antenaTipo;
  posicao_torre?: number;
  vr?: string;
  tipo_equipamento?: string;
  station_id?: string;
  transmissores?: string;
}
export interface AntenaFindByCodigo {
  codigo: string;
}
export interface AntenaRepository {
  create: (data: AntenaCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: AntenaFind) => Promise<Object | null>;
  findByCodigo: (data: AntenaFindByCodigo) => Promise<Object | null>
  update: (data: AntenaUpdate) => Promise<void>;
  delete: (data: AntenaDelete) => Promise<void>;
}