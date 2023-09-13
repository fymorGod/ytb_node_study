import { prisma } from "../../database/prisma";
import { ChecklistCreateData, ChecklistDelete, ChecklistFind, ChecklistRepository, ChecklistUpdate } from "../interfaces/checklist/checklist-repository";

interface TarefaProps {
  description: string,
  verificado: boolean,
  foto_verificado: boolean
}
export class PrismaChecklistRepository implements ChecklistRepository {

  async create({ name, tarefas, tipo_equipamento }: ChecklistCreateData) {
    const data: any = {
      name,
      tarefa: {
        create: tarefas?.map((task:TarefaProps) => ({
          description: task.description,
          verificado: task.verificado,
          foto_verificado: task.foto_verificado
        }))
      },
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    };
  
    return await prisma.checklist.create({
      data,
    });
  }

  async get() {
    const checklist = await prisma.checklist.findMany({
      select: {
        id:true,
        name: true,
        tarefa: true,
        TipoEquipamento: {
          select: {
            name: true
          }
        },
      }
    });
    return checklist;
  }

  async find({ id }: ChecklistFind) {
    const checklist = await prisma.checklist.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        tarefa: true,
        TipoEquipamento: {
          select: {
            name: true
          }
        }
      },
    });
    return checklist;
  }

  async delete({ id }: ChecklistDelete) {
    await prisma.checklist.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, name, tarefas, tipo_equipamento  }: ChecklistUpdate) {
    await prisma.checklist.update({
      where: {
        id,
      },
      data: {
        name,
        tarefa: {
          create: tarefas?.map((task:TarefaProps) => ({
            description: task.description,
            verificado: task.verificado,
            foto_verificado: task.foto_verificado
          }))
        },
        TipoEquipamento: {
          connect: {
            id: tipo_equipamento
          },
        }
      }
    });
  }

}