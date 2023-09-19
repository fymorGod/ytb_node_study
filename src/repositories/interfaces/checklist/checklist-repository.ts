export interface TarefaProps {
  description: string,
  verificado: boolean,
  foto_verificado: boolean
}
export interface ChecklistCreateData {
  name: string;
  tarefas: TarefaProps[];
  tipo_equipamento: string;
}

export interface ChecklistFind {
  name: string;
}

export interface ChecklistDelete {
  id: string;
}

export interface ChecklistUpdate {
  id: string;
  name?: string;
  tarefas?: TarefaProps[];
  tipo_equipamento?: string;
}

export interface ChecklistRepository {
  create: (data: ChecklistCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: ChecklistFind) => Promise<Object | null>;
  update: (data: ChecklistUpdate) => Promise<void>;
  delete: (data: ChecklistDelete) => Promise<void>;
}