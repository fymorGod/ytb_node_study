import { prisma } from "../../database/prisma";
import { ChecklistCreateData, ChecklistDelete, ChecklistFind, ChecklistRepository, ChecklistUpdate } from "../interfaces/checklist/checklist-repository";

interface TarefaProps {
  id?: string;
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
    try {
      // Encontre as tarefas associadas ao checklist
      const tasks = await prisma.tarefa.findMany({
        where: {
          checklistId: id,
        },
      });
  
      // Delete as tarefas
      await Promise.all(
        tasks.map(async (task) => {
          await prisma.tarefa.delete({
            where: {
              id: task.id,
            },
          });
        })
      );
  
      // Delete o checklist
      await prisma.checklist.delete({
        where: {
          id,
        },
      });
  
      console.log('Checklist e tarefas associadas deletadas com sucesso');
    } catch (error) {
      console.error('Ocorreu um erro ao deletar o checklist e suas tarefas:', error);
    } finally {
      await prisma.$disconnect(); // Feche a conexão com o Prisma
    }
  }

  async update({ id, name, tarefas, tipo_equipamento  }: ChecklistUpdate) {

    try {
      await prisma.checklist.update({
        where: {
          id,
        },
        data: {
          name,
          TipoEquipamento: { 
            connect: {
              name: tipo_equipamento,
            },
          },
        },
      });
  
      if (tarefas && tarefas.length > 0) {
        // Atualize as tarefas corretamente
        await Promise.all(
          tarefas.map(async (task:TarefaProps) => {
            await prisma.tarefa.update({
              where: {
                id: task.id,
              },
              data: {
                description: task.description,
                verificado: task.verificado,
                foto_verificado: task.foto_verificado,
              },
            });
          })
        );
      }
  
      console.log('Checklist e tarefas atualizadas com sucesso');
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar o checklist e as tarefas:', error);
    } finally {
      await prisma.$disconnect(); // Feche a conexão com o Prisma
    }

    // if (tarefas && tarefas.length > 0) {
    //   // Atualize as tarefas corretamente
    //   await Promise.all(
    //     tarefas.map(async (task: TarefaProps) => {
    //       await prisma.tarefa.update({
    //         where: {
    //           id: task.id
    //         },
    //         data: {
    //           description: task.description,
    //           verificado: task.verificado,
    //           foto_verificado: task.foto_verificado,
    //         },
    //       });
    //     })
    //   );
    // }
    // await prisma.checklist.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     name,
    //     TipoEquipamento: {
    //       connect: {
    //         name: tipo_equipamento
    //       },
    //     }
    //   }
    // });
  }

}