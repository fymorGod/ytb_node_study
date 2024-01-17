import { prisma } from "../../database/prisma";
import { TransmissorCreateData, TransmissorDelete, TransmissorFind, TransmissorFindByCodigo, TransmissorRepository, TransmissorUpdate } from "../interfaces/transmissor/transmissor-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export const isReceptorIdValid = async ({ id }: any) => {
  const receptorID = await prisma.receptor.findUnique({
    where: {
      id
    }
  })
  return !!receptorID;
}

export const isAntenaIdValid = async ({ id }: any) => {
  const antenaID = await prisma.antena.findUnique({
    where: {
      id
    }
  })
  return !!antenaID;
}

export class PrismaTransmissorRepository implements TransmissorRepository {

  async create({ codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, receptor, antena, tipo_equipamento, station_id }: TransmissorCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      programmed,
      canal_fisico,
      canal_virtual,
      acoplador_one,
      acoplador_two,
      Receptor: {
        connect: {
          id: receptor
        }
      },
      Antena: {
        connect: {
          id: antena
        }
      },
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
    };
    if (station_id && (await isReceptorIdValid({ id: station_id }))) {
      data.Receptor = {
        connect: {
          id: station_id
        }
      };
    }
    if (station_id && (await isAntenaIdValid({ id: station_id }))) {
      data.Antena = {
        connect: {
          id: station_id
        }
      };
    }
    if (station_id && (await isStationIdValid({ id: station_id }))) {
      data.Station = {
        connect: {
          id: station_id
        }
      };
    }

    return await prisma.transmissor.create({
      data,
    });
  }

  async get() {
    const transmissor = await prisma.transmissor.findMany({
      select: {
        id: true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        programmed: true,
        canal_fisico: true,
        canal_virtual: true,
        acoplador_one: true,
        acoplador_two: true,
        Receptor: {
          select: {
            id: true
          }
        },
        TipoEquipamento: {
          select: {
            name: true
          }
        },
        Station: {
          select: {
            name: true
          }
        },
      },
    });

    return transmissor;
  }

  async find({ id }: TransmissorFind) {
  const transmissor = await prisma.transmissor.findUnique({
    where: {
      id,
    },
    select: {
      codigo: true,
      marca: true,
      modelo: true,
      categoria: true,
      status: true,
      programmed: true,
      canal_fisico: true,
      canal_virtual: true,
      acoplador_one: true,
      acoplador_two: true,
      Receptor: {
        select: {
          id: true
        }
      },
      Antena: {
        select: {
          id: true
        }
      },
      TipoEquipamento: {
        select: {
          name: true
        }
      },
      Station: {
        select: {
          name: true,
          address: true,
          id: true,
          latitude: true,
          link_grafana: true,
          longitude: true,
          manutencao: {
            select: {
              checklist:true,
              dataCreate: true,
              observacao: true,
              stationId: true,
              status: true,
              tipo: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  empresa: true,
                  contato_empresa: true,
                  Access: {
                    select: {
                      name: true
                    }
                  }
                }
              },
              Station: {
                select: {
                  name: true,
                  address: true,
                }
              }
            }
          }
        }
      },
      
    },
  });
  return transmissor;
}

  async findByCodigo({ codigo }: TransmissorFindByCodigo) {
  const transmissor = await prisma.transmissor.findFirst({
    where: {
      codigo
    }
  })

  return transmissor
}

  async delete ({ id }: TransmissorDelete) {
  await prisma.transmissor.delete({
    where: {
      id,
    },
  });
}

  async update({ id ,codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, receptor, antena, tipo_equipamento, station_id }: TransmissorUpdate) {
  await prisma.transmissor.update({
    where: {
      id,
    },
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      programmed,
      canal_fisico,
      canal_virtual,
      acoplador_one,
      acoplador_two,
      Receptor: {
        connect: {
          id: receptor
        }
      },
      Antena: {
        connect: {
          id: antena
        }
      },
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        },
      },
      Station: {
        connect: {
          id: station_id
        },
      },     
    }
  });
}

}