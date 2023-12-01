import { prisma } from "../../../database/prisma";
import { DocumentRepository, DocumentCreateData, DocumentFind, DocumentDelete } from '../../interfaces/documentos/documentos-repository'

export class PrismaDocumentRepository implements DocumentRepository {

  async create({ path, filename, originalName, fileFormat}: DocumentCreateData) {
    return await prisma.documento.create({
      data: {
        path,
        filename,
        originalName,
        fileFormat
      }
    });
  }

  async get() {
    const documentos = await prisma.documento.findMany({
      orderBy: {
        filename: "asc"
      }
    });
    return documentos;
  }

  async find({ id }: DocumentFind) {
    const documento = await prisma.documento.findUnique({
      where: {
        id,
      }
    });
    return documento;
  };

  async delete({ id }: DocumentDelete) {
    await prisma.documento.delete({
      where: {
        id,
      }
    })
  }
}