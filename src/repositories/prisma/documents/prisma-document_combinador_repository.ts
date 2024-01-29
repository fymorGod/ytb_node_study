import { prisma } from "../../../database/prisma";
import { DocumentCombinadorCreateData, DocumentCombinadorDelete, DocumentCombinadorFind, DocumentCombinadorRepository } from "../../interfaces/documentos/documentos_combinador-repositoy";

export class PrismaDocumentCombinadorRepository implements DocumentCombinadorRepository {
  async create({ documentoId, combinadorId }: DocumentCombinadorCreateData) {
    await prisma.documento_Combinador.create({
      data: {
        documentoId,
        combinadorId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Combinador.findMany({});
      return documentos
    };
    async find({ id }: DocumentCombinadorFind) {
      const documento = await prisma.documento_Combinador.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentCombinadorDelete) {
      await prisma.documento_Combinador.delete({
        where: {
          id,
        }
      })
    }
}