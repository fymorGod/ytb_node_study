import { prisma } from "../../../database/prisma";
import { DocumentDpsCreateData, DocumentDpsDelete, DocumentDpsFind, DocumentDpsRepository } from "../../interfaces/documentos/documentos_dps-repository";

export class PrismaDocumentDpsRepository implements DocumentDpsRepository {
  async create({ documentoId, dpsId }: DocumentDpsCreateData) {
    await prisma.documento_Dps.create({
      data: {
        documentoId,
        dpsId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Dps.findMany({});
      return documentos
    };
    async find({ id }: DocumentDpsFind) {
      const documento = await prisma.documento_Dps.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentDpsDelete) {
      await prisma.documento_Dps.delete({
        where: {
          id,
        }
      })
    }
}