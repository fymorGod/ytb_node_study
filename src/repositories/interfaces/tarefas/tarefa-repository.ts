
export interface TarefaCreateData {
  description: string;
  verificado: boolean;
  foto_verificado: boolean;
}

export interface TarefaFind {
  id: string;
}

export interface TarefaDelete {
  id: string;
}

export interface TarefaUpdate {
  id: string;
  description?: string;
  verificado?: boolean;
  foto_verificado?: boolean;
}

export interface TarefaRepository {
  create: (data: TarefaCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: TarefaFind) => Promise<Object | null>;
  update: (data: TarefaUpdate) => Promise<Object | null>;
  delete: (data: TarefaDelete) => Promise<void>;
}