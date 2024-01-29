import { prisma } from "../../../database/prisma";
import { DocumentCaboCreateData, DocumentCaboDelete, DocumentCaboFind, DocumentCaboRepository } from "../../interfaces/documentos/documentos_cabo-repository";

export class PrismaDocumentCaboRepository implements DocumentCaboRepository {
  async create({ documentoId, caboId }: DocumentCaboCreateData) {
    await prisma.documento_Cabo.create({
      data: {
        documentoId,
        caboId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Cabo.findMany({});
      return documentos
    };
    async find({ id }: DocumentCaboFind) {
      const documento = await prisma.documento_Cabo.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentCaboDelete) {
      await prisma.documento_Cabo.delete({
        where: {
          id,
        }
      })
    }
}