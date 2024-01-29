import { prisma } from "../../../database/prisma";
import { DocumentDisjuntorCreateData, DocumentDisjuntorDelete, DocumentDisjuntorFind, DocumentDisjuntorRepository } from "../../interfaces/documentos/documentos_disjuntor-repository";

export class PrismaDocumentDisjuntorRepository implements DocumentDisjuntorRepository {
  async create({ documentoId, disjuntorId }: DocumentDisjuntorCreateData) {
    await prisma.documento_Disjuntor.create({
      data: {
        documentoId,
        disjuntorId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Disjuntor.findMany({});
      return documentos
    };
    async find({ id }: DocumentDisjuntorFind) {
      const documento = await prisma.documento_Disjuntor.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentDisjuntorDelete) {
      await prisma.documento_Disjuntor.delete({
        where: {
          id,
        }
      })
    }
}