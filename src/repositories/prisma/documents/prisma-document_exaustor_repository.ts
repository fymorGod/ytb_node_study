import { prisma } from "../../../database/prisma";
import { DocumentExaustorCreateData, DocumentExaustorDelete, DocumentExaustorFind, DocumentExaustorRepository } from "../../interfaces/documentos/documentos_exaustor-repository";

export class PrismaDocumentExaustorRepository implements DocumentExaustorRepository {
  async create({ documentoId, exaustorId }: DocumentExaustorCreateData) {
    await prisma.documento_Exaustor.create({
      data: {
        documentoId,
        exaustorId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Exaustor.findMany({});
      return documentos
    };
    async find({ id }: DocumentExaustorFind) {
      const documento = await prisma.documento_Exaustor.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentExaustorDelete) {
      await prisma.documento_Exaustor.delete({
        where: {
          id,
        }
      })
    }
}