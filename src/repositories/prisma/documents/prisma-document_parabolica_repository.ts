import { prisma } from "../../../database/prisma";
import { DocumentParabolicaCreateData, DocumentParabolicaDelete, DocumentParabolicaFind, DocumentParabolicaRepository } from "../../interfaces/documentos/documentos_parabolica-repository";

export class PrismaDocumentParabolicaRepository implements DocumentParabolicaRepository {
  async create({ documentoId, parabolicaId }: DocumentParabolicaCreateData) {
    await prisma.documento_Parabolica.create({
      data: {
        documentoId,
        parabolicaId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Parabolica.findMany({});
      return documentos
    };
    async find({ id }: DocumentParabolicaFind) {
      const documento = await prisma.documento_Parabolica.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentParabolicaDelete) {
      await prisma.documento_Parabolica.delete({
        where: {
          id,
        }
      })
    }
}