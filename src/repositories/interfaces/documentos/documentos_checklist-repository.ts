export interface DocumentChecklistCreateData {
  documentoId: string;
  checklistId: string;
}

export interface DocumentChecklistFind {
  id: string;
}

export interface DocumentChecklistDelete {
  id: string;
}

export interface DocumentChecklistRepository {
  create: (data: DocumentChecklistCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: DocumentChecklistFind) => Promise<Object | null>
  delete: (data: DocumentChecklistDelete) => Promise<void>
}