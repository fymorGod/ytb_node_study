import { prisma } from "../../../database/prisma";
import { DocumentTorreCreateData, DocumentTorreRepository, DocumentTorreFind, DocumentTorreDelete } from "../../interfaces/documentos/documentos_torre-repository";

export class PrismaDocumentTorreRepository implements DocumentTorreRepository {
  async create({ documentoId, torreId }: DocumentTorreCreateData) {
    await prisma.documento_Torre.create({
      data: {
        documentoId,
        torreId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Torre.findMany({});
      return documentos
    };
    async find({ id }: DocumentTorreFind) {
      const documento = await prisma.documento_Torre.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentTorreDelete) {
      await prisma.documento_Torre.delete({
        where: {
          id,
        }
      })
    }
}