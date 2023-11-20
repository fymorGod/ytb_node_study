import { prisma } from "../../database/prisma";
import { TarefaProps } from "../interfaces/checklist/checklist-repository";
import { ManutencaoCreateData, ManutencaoDelete, ManutencaoFind, ManutencaoRepository, ManutencaoUpdate } from "../interfaces/manutencao/manutencao-repository";

interface ChecklistProps {
  id?: string;
  name: string
  tarefa: TarefaProps[]
  tipo_equipamento: string
  template?: string
}

export const isUserIdValid = async ({ id }: any) => {
  const userId = await prisma.user.findUnique({
    where: {
      id
    }
  });
  return !!userId;
}

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export class PrismaManutencaoRepository implements ManutencaoRepository {
  async create({userId, stationId, dataCreate, checklist, observacao, status, tipo}: ManutencaoCreateData) {
    const data: any = {
      dataCreate,
      checklist: {
        create: checklist?.map((check: ChecklistProps) => ({
            name: check.name,
            tarefa: {
              create: check.tarefa?.map((task: TarefaProps) => ({
                description: task.description,
                verificado: task.verificado,
                foto_verificado: task.foto_verificado
                })
              )
            },
            tipo_equipamento: check.tipo_equipamento,
            template: check.template
          }))
      },
      observacao,
      status, 
      tipo
    }
    if(stationId && (await isStationIdValid({ id: stationId })) ){
      data.Station = {
        connect: {
          id: stationId
        }
      };
    }
    if(userId && (await isUserIdValid({ id: userId }))) {
      data.User = {
        connect: {
          id: userId
        }
      }
    }

    return await prisma.manutencao.create({
      data,
    });
  }
  async get() {
    const manutencoes = await prisma.manutencao.findMany({
      select: {
        id:true,
        User: {
          select: {
            name: true,
          },
        },
        Station: {
          select: {
            name: true,
          },
        },
        checklist: true,
        dataCreate: true,
        observacao: true,
        status: true         
      }
    });
    return manutencoes;
  }
  async find({ id }: ManutencaoFind) {
    const manutencao = await prisma.manutencao.findUnique({
      where: {
        id,
      },
      select: {
        User: {
          select: {
            name: true,
          },
        },
        Station: {
          select: {
            name: true,
          },
        },
        checklist: true,
        dataCreate: true,
        observacao: true,
        status: true     
      }
    });
    return manutencao;
  }
  async delete({ id }: ManutencaoDelete) {
    await prisma.manutencao.delete({
      where: {
        id,
      },
    });
  }
  async update({ id, userId, stationId, dataCreate, checklist, observacao, status, tipo }: ManutencaoUpdate) {
    try {
      await prisma.manutencao.update({
        where: {
          id,
        },
        data: {
          User: {
            connect: {
              id: userId
            }
          },
          Station: {
            connect: {
              id: stationId
            }
          },
          dataCreate,
          observacao,
          status, 
          tipo
        }
      });

      if(checklist && checklist.length > 0) {
        await Promise.all(
          checklist.map(async (check: ChecklistProps) => {
            await prisma.checklist.update({
              where: {
                id: check.id
              },
              data: {
                name: check.name,
                TipoEquipamento: {
                  connect: {
                    name: check.tipo_equipamento
                  }
                },
                Template: {
                  connect: {
                    id: check.template
                  }
                }
              }
            });

            if (check.tarefa && check.tarefa.length > 0) {
              // Atualize as tarefas corretamente
              await Promise.all(
                check.tarefa.map(async (task:TarefaProps) => {
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
          })
        )
      }
    } catch (err) {
      console.error('Ocorreu um erro ao atualizar a manutenção ', err)
    } finally {
      await prisma.$disconnect();
    }
  }
}