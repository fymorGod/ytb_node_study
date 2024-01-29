import { prisma } from "../../../database/prisma";
import { DocumentArcondicionadoCreateData, DocumentArcondicionadoDelete, DocumentArcondicionadoFind, DocumentArcondicionadoRepository } from "../../interfaces/documentos/documentos_arcondicionado-repository";

export class PrismaDocumentArcondicionadoRepository implements DocumentArcondicionadoRepository {
  async create({ documentoId, arcondicionadoId }: DocumentArcondicionadoCreateData) {
    await prisma.documento_Arcondicionado.create({
      data: {
        documentoId,
        arcondicionadoId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Arcondicionado.findMany({});
      return documentos
    };
    async find({ id }: DocumentArcondicionadoFind) {
      const documento = await prisma.documento_Arcondicionado.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentArcondicionadoDelete) {
      await prisma.documento_Arcondicionado.delete({
        where: {
          id,
        }
      })
    }
}