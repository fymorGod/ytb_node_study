import { prisma } from "../../../database/prisma";
import { DocumentUserCreateData, DocumentUserDelete, DocumentUserFind, DocumentUserRepository } from "../../interfaces/documentos/documentos_user-repository";

export class PrismaDocumentUserRepository implements DocumentUserRepository {
  async create({ documentoId, userId }: DocumentUserCreateData) {
    await prisma.documento_Usuario.create({
      data: {
        documentoId,
        userId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Usuario.findMany({});
      return documentos
    };
    async find({ id }: DocumentUserFind) {
      const documento = await prisma.documento_Usuario.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentUserDelete) {
      await prisma.documento_Usuario.delete({
        where: {
          id,
        }
      })
    }
}