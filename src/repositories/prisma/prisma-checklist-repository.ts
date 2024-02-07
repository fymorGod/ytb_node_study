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
    const checklists = await prisma.checklist.findMany({
      select: {
        id: true,
        name: true,
        TipoEquipamento: {
          select: {
            name: true,
          },
        },
        Documento_Checklist: {
          select: {
            documento: true
          }
        },
        tarefa: {
          select: {
            id: true,
            description: true,
            verificado: true,
            foto_verificado: true,

            Documento_Tarefa: {
              select: {
                documento: true
              }
            }
          },
        },
      },
    });
    // const checklistsSemManutencao = checklists.filter((checklist) => !checklist.manutencaoId);
    return checklists;
  }

  async find({ id }: ChecklistFind) {
    const checklist = await prisma.checklist.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        tarefa: {
          select: {
              id: true,
              description: true,
              verificado: true,
              foto_verificado: true,
              Documento_Tarefa: {
                select: {
                  documento: true
                }
              }
          }
      },
      Documento_Checklist: {
        select: {
          documento: true
        }
      },
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
      // Verifique se o checklist com o ID fornecido existe no banco de dados
      const checklist = await prisma.checklist.findUnique({
          where: { id },
          include: { tarefa: true },
      });

      if (!checklist) {
          throw new Error('Checklist not found');
      }

      // Atualize os atributos do checklist
      const updatedChecklist = await prisma.checklist.update({
          where: { id },
          data: { name },
      });

      // Atualize o tipo de equipamento separadamente
      if (tipo_equipamento) {
          await prisma.checklist.update({
              where: { id: updatedChecklist.id },
              data: {
                  TipoEquipamento: {
                      connect: { name: tipo_equipamento },
                  },
              },
          });
      }

      // Crie uma lista para acompanhar as tarefas atualizadas
      const updatedTasks = [];

      // Itere sobre os dados das tarefas na solicitação
      for (const taskData of tarefas || []) {
          const taskId = taskData.id;
          const description = taskData.description;
          const verificado = taskData.verificado;
          const foto_verificado = taskData.foto_verificado;

          // Se um ID de tarefa for fornecido, atualize a tarefa existente
          if (taskId) {
              const task = checklist.tarefa.find((t) => t.id === taskId);
              if (task) {
                  await prisma.tarefa.update({
                      where: { id: taskId },
                      data: {
                          description,
                          verificado,
                          foto_verificado,
                      },
                  });
              }
          } else {
              // Se nenhum ID de tarefa for fornecido, crie uma nova tarefa com referência ao checklist
              const newTask = await prisma.tarefa.create({
                  data: {
                      description,
                      verificado,
                      foto_verificado,
                      Checklist: { connect: { id: updatedChecklist.id } },
                  },
              });
              updatedTasks.push(newTask);
          }
      }

      // Remova as tarefas que não estão mais na lista de tarefas atualizadas
      for (const task of checklist.tarefa) {
          if (!updatedTasks.some((t) => t.id === task.id)) {
              await prisma.tarefa.delete({
                  where: { id: task.id },
              });
          }
      }

      return;
  } catch (error:any) {
      // Lançar a exceção em caso de erro
      throw new Error(`An error occurred while updating the checklist and tasks: ${error.message}`);
  }
  }

}