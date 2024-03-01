import { prisma } from "../../../database/prisma";
import { DocumentSwitchCreateData, DocumentSwitchDelete, DocumentSwitchFind, DocumentSwitchRepository } from "../../interfaces/documentos/documentos_switch-repository";

export class PrismaDocumentSwitchRepository implements DocumentSwitchRepository {
  async create({ documentoId, switchiesId }: DocumentSwitchCreateData) {
    await prisma.documento_Switch.create({
      data: {
        documentoId,
        switchiesId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Switch.findMany({});
      return documentos
    };
    async find({ id }: DocumentSwitchFind) {
      const documento = await prisma.documento_Switch.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentSwitchDelete) {
      await prisma.documento_Switch.delete({
        where: {
          id,
        }
      })
    }
}