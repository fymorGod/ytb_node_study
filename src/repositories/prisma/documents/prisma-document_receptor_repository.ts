import { prisma } from "../../../database/prisma";
import { DocumentReceptorCreateData, DocumentReceptorDelete, DocumentReceptorFind, DocumentReceptorRepository } from "../../interfaces/documentos/documentos_receptor-repository";

export class PrismaDocumentReceptorRepository implements DocumentReceptorRepository {
  async create({ documentoId, receptorId }: DocumentReceptorCreateData) {
    await prisma.documento_Receptor.create({
      data: {
        documentoId,
        receptorId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Receptor.findMany({});
      return documentos
    };
    async find({ id }: DocumentReceptorFind) {
      const documento = await prisma.documento_Receptor.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentReceptorDelete) {
      await prisma.documento_Receptor.delete({
        where: {
          id,
        }
      })
    }
}