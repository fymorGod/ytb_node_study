import { prisma } from "../../../database/prisma";
import { DocumentChecklistCreateData, DocumentChecklistDelete, DocumentChecklistFind, DocumentChecklistRepository } from "../../interfaces/documentos/documentos_checklist-repository";

export class PrismaDocumentChecklistRepository implements DocumentChecklistRepository {
  async create({ documentoId, checklistId }: DocumentChecklistCreateData) {
    await prisma.documento_Checklist.create({
      data: {
        documentoId,
        checklistId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Checklist.findMany({});
      return documentos
    };
    async find({ id }: DocumentChecklistFind) {
      const documento = await prisma.documento_Checklist.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentChecklistDelete) {
      await prisma.documento_Checklist.delete({
        where: {
          id,
        }
      })
    }
}