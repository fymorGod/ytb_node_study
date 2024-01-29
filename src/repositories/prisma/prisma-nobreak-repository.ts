import { prisma } from "../../database/prisma";
import { NobreakCreateData, NobreakDelete, NobreakFind, NobreakFindByCodigo, NobreakRepository, NobreakUpdate } from "../interfaces/nobreak/nobreak-repository";


export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}
export class PrismaNobreakRepository implements NobreakRepository {

  async create({ codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento, station_id }: NobreakCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tensao_entrada,
      tensao_saida,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
    };
  
    if (station_id && (await isStationIdValid({ id: station_id}))) {
      data.Station = {
        connect: {
          id: station_id
        }
      };
    }
  
    return await prisma.nobreak.create({
      data,
    });
  }

  async get() {
    const nobreaks = await prisma.nobreak.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        tensao_entrada: true,
        tensao_saida: true,
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
      }
    });
    return nobreaks;
  }

  async find({ id }: NobreakFind) {
    const nobreaks = await prisma.nobreak.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        tensao_entrada: true,
        tensao_saida: true,
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
                id: true,
                checklistManutencao:true,  
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
    return nobreaks;
  }

  async findByCodigo ({ codigo }: NobreakFindByCodigo) {
    const nobreak = await prisma.nobreak.findFirst({
      where: {
        codigo
      }
    })

    return nobreak
  }

  async delete({ id }: NobreakDelete) {
    await prisma.nobreak.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento, station_id }: NobreakUpdate) {
    await prisma.nobreak.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        tensao_entrada,
        tensao_saida,
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