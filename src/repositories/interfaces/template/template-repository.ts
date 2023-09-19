
interface ChecklistID{
  id: string;
}


export interface TemplateCreateData {
  name: string;
  checklist:  ChecklistID[]
}

export interface TemplateFind {
  id: string;
}

export interface TemplateDelete {
  id: string;
}

export interface TemplateUpdate {
  id: string;
  name?: string;
  checklist?:  ChecklistID[]
}


export interface TemplateRepository {
  create: (data: TemplateCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: TemplateFind) => Promise<Object | null>;
  update: (data: TemplateUpdate) => Promise<void>;
  delete: (data: TemplateDelete) => Promise<void>;
}