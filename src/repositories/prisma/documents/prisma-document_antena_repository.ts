import { prisma } from "../../../database/prisma";
import { DocumentAntenaCreateData, DocumentAntenaDelete, DocumentAntenaFind, DocumentAntenaRepository } from "../../interfaces/documentos/documentos_antena-repository";

export class PrismaDocumentAntenaRepository implements DocumentAntenaRepository {
  async create({ documentoId, antenaId }: DocumentAntenaCreateData) {
    await prisma.documento_Antenas.create({
      data: {
        documentoId,
        antenaId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Antenas.findMany({});
      return documentos
    };
    async find({ id }: DocumentAntenaFind) {
      const documento = await prisma.documento_Antenas.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentAntenaDelete) {
      await prisma.documento_Antenas.delete({
        where: {
          id,
        }
      })
    }
}