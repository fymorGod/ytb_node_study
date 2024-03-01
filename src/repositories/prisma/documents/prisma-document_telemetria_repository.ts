import { prisma } from "../../../database/prisma";
import { DocumentTelemetriaCreateData, DocumentTelemetriaDelete, DocumentTelemetriaFind, DocumentTelemetriaRepository } from "../../interfaces/documentos/documentos_telemetria-repository";

export class PrismaDocumentTelemetriaRepository implements DocumentTelemetriaRepository {
  async create({ documentoId, telemetriaId }: DocumentTelemetriaCreateData) {
    await prisma.documento_Telemetria.create({
      data: {
        documentoId,
        telemetriaId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Telemetria.findMany({});
      return documentos
    };
    async find({ id }: DocumentTelemetriaFind) {
      const documento = await prisma.documento_Telemetria.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentTelemetriaDelete) {
      await prisma.documento_Telemetria.delete({
        where: {
          id,
        }
      })
    }
}