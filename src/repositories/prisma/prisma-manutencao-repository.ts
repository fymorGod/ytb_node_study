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
        tipo: true,
        checklist: true,
        dataCreate: true,
        observacao: true,
        status: true,
        Station: {
          select: {
            name: true,
            address: true,
            latitude: true,
            longitude: true,
            link_grafana: true,
            status: true,
            antena: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                gain: true,
                posicao_torre:true,
                tipos_antena: true,
                status: true,
                transmissores: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            arcondicionado: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                potencia: true,
                tensao: true,
                status: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            cabo:{
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                tamanho: true,
                tipos_cabo: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            combinador: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            disjuntor: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                corrente_maxima: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            dps:{
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                classe_dps: true,
                corrente_maxima: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            exaustor: {
              select: {
                id: true,
                categoria: true,
                codigo: true,
                marca: true,
                modelo: true,
                status: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            nobreak: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                tensao_entrada: true,
                tensao_saida: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            parabolica: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                diametro: true,
                satelite: true,
                receptor: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            quadro: {
              select: {
                id: true,
                Dps: {
                  select: {
                    id: true,
                  }
                },
                Disjuntor: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            receptor: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                frequencia: true,
                Parabolica: {
                  select: {
                    id: true
                  }
                },
                symbol_rate: true,
                Transmissor: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            switchies: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                qtd_portas: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            telemetria: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            torre: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                altura: true,
                aterramento: true,
                tipo_torre: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            transmissor: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                acoplador_one: true,
                acoplador_two: true,
                canal_fisico: true,
                canal_virtual: true,
                programmed: true,
                Antena: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            }
          },
        }
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
            address: true,
            latitude: true,
            longitude: true,
            link_grafana: true,
            status: true,
            antena: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                gain: true,
                posicao_torre:true,
                tipos_antena: true,
                status: true,
                transmissores: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            arcondicionado: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                potencia: true,
                tensao: true,
                status: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            cabo:{
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                tamanho: true,
                tipos_cabo: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            combinador: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            disjuntor: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                corrente_maxima: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            dps:{
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                classe_dps: true,
                corrente_maxima: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            exaustor: {
              select: {
                id: true,
                categoria: true,
                codigo: true,
                marca: true,
                modelo: true,
                status: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            nobreak: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                tensao_entrada: true,
                tensao_saida: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            parabolica: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                diametro: true,
                satelite: true,
                receptor: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            quadro: {
              select: {
                id: true,
                Dps: {
                  select: {
                    id: true,
                  }
                },
                Disjuntor: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            receptor: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                frequencia: true,
                Parabolica: {
                  select: {
                    id: true
                  }
                },
                symbol_rate: true,
                Transmissor: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            switchies: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                qtd_portas: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            telemetria: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            torre: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                altura: true,
                aterramento: true,
                tipo_torre: true,
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            },
            transmissor: {
              select: {
                id: true,
                categoria: true,
                codigo:true,
                marca: true,
                modelo: true,
                status:true,
                acoplador_one: true,
                acoplador_two: true,
                canal_fisico: true,
                canal_virtual: true,
                programmed: true,
                Antena: {
                  select: {
                    id: true
                  }
                },
                TipoEquipamento: {
                  select: {
                    name: true,
                    checklist: {
                      select: {
                        id: true,
                        name:true,
                        tarefa: true
                      }
                    }
                  }
                },
              }
            }
          },
        },
        checklist: {
          select: {
            id: true,
            name: true,
            TipoEquipamento: true,
            tarefa: {
              select: {
                description: true,
                foto_verificado: true,
                verificado: true
              }
            }
          }
        },
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