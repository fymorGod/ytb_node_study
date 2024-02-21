import { prisma } from "../../database/prisma";
import { StationCreateData, StationDelete, StationFind, StationFindByName, StationRepository, StationUpdate } from "../interfaces/station/station-repository";

// export const isAntenaIdValid = async ({ id }: any) => {
//   const antenaID = await prisma.antena.findUnique({
//     where: {
//       id
//     }
//   })
//   return !!antenaID;
// }
export const isManutencaoIdValid = async ({ id }: any) => {
  const manutencaoID = await prisma.manutencao.findUnique({
    where: {
      id
    }
  })
  return !!manutencaoID;
}
export class PrismaStationRepository implements StationRepository {

  async create({ name, address, latitude, link_grafana, longitude, status, manutencaoId }: StationCreateData) {
    const data: any = {
      name,
      address,
      latitude,
      link_grafana,
      longitude,
      status,
    };
    if (manutencaoId && (await isManutencaoIdValid({ id: manutencaoId}))) {
      data.manutencao = {
        connect: {
          id: manutencaoId
        }
      };
    }
    return await prisma.station.create({
      data,
    });
  }

  async get() {
    const station = await prisma.station.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        latitude: true,
        longitude: true,
        link_grafana: true,
        status: true,
        Documento_Station: {
          select: {
            documento: true
          }
        },
        manutencao: {
          select: {
            id:true,
            checklistManutencao: true,
            observacao: true,
            status: true,
            tipo: true,
            userId: true
          }
        },
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
        },
      }
    });
    return station;
  }

  async find({ id }: StationFind) {
    const station = await prisma.station.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        address: true,
        latitude: true,
        longitude: true,
        link_grafana: true,
        status: true,
        Documento_Station: {
          select: {
            documento: true
          }
        },
        manutencao: {
          select: {
            id:true,
            checklistManutencao: true,
            observacao: true,
            status: true,
            tipo: true,
            Station: {
              select: {
                name: true,
                address: true
              }
            },
            User: {
              select: {
                name: true
              }
            },
            userId: true
          }
        },
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
            codigo: true,
            categoria: true,
            status: true,
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
        },
      },
    });
    return station;
  }

  async findByName({ name }: StationFindByName) {
    const station = await prisma.station.findFirst({
      where: {
        name
      }
    })

    return station
  }

  async delete({ id }: StationDelete) {
    await prisma.station.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, name, address, latitude, link_grafana, longitude, status}: StationUpdate) {
    await prisma.station.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        latitude,
        link_grafana,
        longitude,
        status,
        // antena: {
        //   connect: {
        //     id: antena
        //   }
        // }, 
        // arcondicionado: {
        //   connect: {
        //     id: arcondicionado
        //   }
        // }, 
        // cabo: {
        //   connect: {
        //     id: cabo
        //   }
        // }, 
        // combinador: {
        //   connect: {
        //     id: combinador
        //   }
        // }, 
        // disjuntor: {
        //   connect: {
        //     id: disjuntor
        //   }
        // }, 
        // dps: {
        //   connect: {
        //     id: dps
        //   }
        // },
        // exaustor: {
        //   connect: {
        //     id: exaustor
        //   }
        // },
        // nobreak: {
        //   connect: {
        //     id: nobreak
        //   }
        // },
        // quadro: {
        //   connect: {
        //     id: quadro
        //   }
        // },
        // receptor: {
        //   connect: {
        //     id: receptor
        //   }
        // },
        // switchies: {
        //   connect: {
        //     id: switchies
        //   }
        // },
        // telemetria: {
        //   connect: {
        //     id: telemetria
        //   }
        // },
        // torre: {
        //   connect: {
        //     id: torre
        //   }
        // },
        // transmissor: {
        //   connect: {
        //     id: transmissor
        //   }
        // }
      }
    }
    );
  }

}