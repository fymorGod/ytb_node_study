import { prisma } from "../../../database/prisma";
import { DocumentQuadroCreateData, DocumentQuadroDelete, DocumentQuadroFind, DocumentQuadroRepository } from "../../interfaces/documentos/documentos_quadro-repository";

export class PrismaDocumentQuadroRepository implements DocumentQuadroRepository {
  async create({ documentoId, quadroId }: DocumentQuadroCreateData) {
    await prisma.documento_Quadro.create({
      data: {
        documentoId,
        quadroId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Quadro.findMany({});
      return documentos
    };
    async find({ id }: DocumentQuadroFind) {
      const documento = await prisma.documento_Quadro.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentQuadroDelete) {
      await prisma.documento_Quadro.delete({
        where: {
          id,
        }
      })
    }
}