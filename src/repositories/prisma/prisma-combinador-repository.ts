import { prisma } from "../../database/prisma";
import { CombinadorCreateData, CombinadorDelete, CombinadorFind, CombinadorFindByCodigo, CombinadorRepository, CombinadorUpdate } from "../interfaces/combinador/combinador-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export class PrismaCombinadorRepository implements CombinadorRepository {
  async create({ codigo, marca, modelo, categoria, status, tipo_equipamento, station_id}: CombinadorCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
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
    return await prisma.combinador.create({
      data
    });
  }

  
  async get() {
    const combinador = await prisma.combinador.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        TipoEquipamento: {
          select: {
            name: true
          }
        },
        Station: {
          select: {
            name: true
          }
        }
      }
    });
    return combinador;
  }

  async find({ id }: CombinadorFind) {
    const combinador = await prisma.combinador.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
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
    return combinador;
  }

  async findByCodigo ({ codigo }: CombinadorFindByCodigo) {
    const combinador = await prisma.combinador.findFirst({
      where: {
        codigo
      }
    })

    return combinador
  }

  async delete({ id }: CombinadorDelete) {
    await prisma.combinador.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, marca, modelo, categoria, station_id, tipo_equipamento, status }: CombinadorUpdate) {
    await prisma.combinador.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
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