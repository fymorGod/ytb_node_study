export type telemetriaCategoria = "REFRIGERACAO" | "ELETRICA" | "TELEMETRIA" | "IRRADIACAO";
export type telemetriaStatus = "FUNCIONANDO" | "STAND_BY" | "DEFEITO" | "MANUTENCAO";

export interface TelemetriaCreateData {
  codigo: string;
  marca: string;
  modelo: string;
  categoria: telemetriaCategoria;
  status: telemetriaStatus
  tipo_equipamento: string;
  station_id?: string;
}

export interface TelemetriaUpdate {
  id: string;
  codigo?: string;
  marca?: string;
  modelo?: string;
  categoria?: telemetriaCategoria;
  status?: telemetriaStatus;
  status_anterior?: telemetriaStatus;
  tipo_equipamento?: string;
  station_id?: string;
}

export interface TelemetriaFind {
  id: string;
}

export interface TelemetriaDelete {
  id: string;
}

export interface TelemetriaFindByCodigo {
  codigo: string;
}

export interface TelemetriaRepository {
  create: (data: TelemetriaCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: TelemetriaFind) => Promise<Object | null>;
  findByCodigo: (data: TelemetriaFindByCodigo) => Promise<Object | null>
  update: (data: TelemetriaUpdate) => Promise<Object | null>;
  delete: (data: TelemetriaDelete) => Promise<void>;
}