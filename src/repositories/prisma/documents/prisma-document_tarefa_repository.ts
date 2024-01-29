import { prisma } from "../../../database/prisma";
import { DocumentTarefaCreateData, DocumentTarefaDelete, DocumentTarefaFind, DocumentTarefaRepository } from "../../interfaces/documentos/documentos_tarefa-repository";

export class PrismaDocumentTarefaRepository implements PrismaDocumentTarefaRepository {
  async create({ documentoId, tarefaId }: DocumentTarefaCreateData) {
    await prisma.documento_Tarefa.create({
      data: {
        documentoId,
        tarefaId
      }
      });
    };

    async get() {
      const documentos = await prisma.documento_Tarefa.findMany({});
      return documentos
    };
    async find({ id }: DocumentTarefaFind) {
      const documento = await prisma.documento_Tarefa.findUnique({
        where: {
          id,
        }
      });
      return documento
    }
    async delete({ id }: DocumentTarefaDelete) {
      await prisma.documento_Tarefa.delete({
        where: {
          id,
        }
      })
    }
}