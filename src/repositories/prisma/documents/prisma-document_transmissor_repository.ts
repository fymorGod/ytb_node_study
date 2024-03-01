import { prisma } from "../../../database/prisma";
import { DocumentTransmissorRepository, DocumentTransmissorCreateData, DocumentTransmissorFind, DocumentTransmissorDelete } from "../../interfaces/documentos/documentos_transmissor-repository";

export class PrismaDocumentTransmissorRepository implements DocumentTransmissorRepository {
  async create({ documentoId, transmissorId }: DocumentTransmissorCreateData) {
    await prisma.documento_Transmissor.create({
      data: {
        documentoId,
        transmissorId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Transmissor.findMany({});
      return documentos
    };
    async find({ id }: DocumentTransmissorFind) {
      const documento = await prisma.documento_Transmissor.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentTransmissorDelete) {
      await prisma.documento_Transmissor.delete({
        where: {
          id,
        }
      })
    }
}