import { TarefaProps } from "../checklist/checklist-repository";

export type tipoManutencao =  "PREVENTIVA" | "CORRETIVA";
export type statusManutencao = "AGENDADA" | "EM_EXECUCAO" | "EM_AGUARDO" | "FINALIZADA"

export interface Checklist {
  name: string
  tarefa: TarefaProps[]
  id_ativo?: string;
  tipo_equipamento: string
  template?: string
}


export interface ManutencaoCreateData { 
  tipo: tipoManutencao;
  userId: string;
  stationId: string;
  checklist: Checklist[] 
  observacao?: string
  status: statusManutencao
}

export interface ManutencaoFind {
  id: string;
}

export interface ManutencaoDelete {
  id: string;
}

export interface ManutencaoUpdate {
  id: string;
  userId?: string;
  stationId?: string;
  id_ativo?:string;
  tipo?: tipoManutencao;
  checklist?: Checklist[] 
  observacao?: string
  status?: statusManutencao
}

export interface ManutencaoRepository {
  create: (data: ManutencaoCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: ManutencaoFind) => Promise<Object | null>;
  update: (data: ManutencaoUpdate) => Promise<void>;
  delete: (data: ManutencaoDelete) => Promise<void>;
}