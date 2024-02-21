import { DocumentUserRepository } from "../../repositories/interfaces/documentos/documentos_user-repository";

interface CreateDocument_UserRequest {
  documentoId: string;
  userId: string;
}

export class CreateDocument_UserService {
  constructor(
    private documentUserRepository: DocumentUserRepository
  ){}

  async execute(request: CreateDocument_UserRequest) {
    
    const { documentoId, userId } = request;

    try {
      await this.documentUserRepository.create({
        documentoId,
        userId
      })
    } catch (err) {
      return err;
    }
  }
}