import { prisma } from "../../../database/prisma";
import { DocumentStationCreateData, DocumentStationDelete, DocumentStationFind, DocumentStationRepository } from "../../interfaces/documentos/documentos_station-repository";

export class PrismaDocumentStationRepository implements DocumentStationRepository {
  async create({ documentoId, stationId }: DocumentStationCreateData) {
    await prisma.documento_Station.create({
      data: {
        documentoId,
        stationId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Station.findMany({});
      return documentos
    };
    async find({ id }: DocumentStationFind) {
      const documento = await prisma.documento_Station.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentStationDelete) {
      await prisma.documento_Station.delete({
        where: {
          id,
        }
      })
    }
}