import { prisma } from "../../database/prisma";
import { TarefaCreateData, TarefaDelete, TarefaFind, TarefaRepository, TarefaUpdate } from "../interfaces/tarefas/tarefa-repository";

export class PrismaTarefaRepository implements TarefaRepository {

  async create({ description, verificado, foto_verificado }: TarefaCreateData) {
    const data: any = {
      description,
      verificado, 
      foto_verificado
    };
  
    return await prisma.tarefa.create({
      data,
    });
  }

  async get() {
    const tarefas = await prisma.tarefa.findMany({
      select: {
        id:true,
        description: true,
        verificado: true,
        foto_verificado: true
      }
    });
    return tarefas;
  }

  async find({ id }: TarefaFind) {
    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id,
      },
      select: {
        description: true,
        verificado: true,
        foto_verificado: true,
        Documento_Tarefa: {
          select: {
            documento: true
          }
        }
      },
    });
    return tarefa;
  }

  async delete({ id }: TarefaDelete) {
    await prisma.tarefa.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, description, verificado, foto_verificado }: TarefaUpdate) {
    const updatedTarefa = await prisma.tarefa.update({
      where: {
        id,
      },
      data: {
        description,
        verificado,
        foto_verificado
      },
      select: {
        id: true,
        description: true,
        verificado: true,
        foto_verificado: true,
      }
    });
    return updatedTarefa;
  }

}