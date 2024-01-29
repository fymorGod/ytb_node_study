import { prisma } from "../../../database/prisma";
import { DocumentNobreakCreateData, DocumentNobreakDelete, DocumentNobreakFind, DocumentNobreakRepository } from "../../interfaces/documentos/documentos_nobreak-repository";

export class PrismaDocumentNobreakRepository implements DocumentNobreakRepository {
  async create({ documentoId, nobreakId }: DocumentNobreakCreateData) {
    await prisma.documento_Nobreak.create({
      data: {
        documentoId,
        nobreakId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Nobreak.findMany({});
      return documentos
    };
    async find({ id }: DocumentNobreakFind) {
      const documento = await prisma.documento_Nobreak.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentNobreakDelete) {
      await prisma.documento_Nobreak.delete({
        where: {
          id,
        }
      })
    }
}