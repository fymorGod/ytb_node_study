import { prisma } from "../../database/prisma";
import { TorreCreateData, TorreRepository, TorreFind, TorreFindByCodigo, TorreDelete, TorreUpdate } from "../interfaces/torre/torre-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}
export class PrismaTorreRepository implements TorreRepository {

  async create({ codigo, marca, modelo, categoria, status, tipo_torre, aterramento , altura, tipo_equipamento, station_id }: TorreCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipo_torre,
      aterramento,
      altura,
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
  
    return await prisma.torre.create({
      data,
    });
  }

  async get() {
    const torres = await prisma.torre.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        tipo_torre: true,
        aterramento:true,
        altura: true,
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
    return torres;
  }

  async find({ id }: TorreFind) {
    const torre = await prisma.torre.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        tipo_torre: true,
        aterramento:true,
        altura: true,
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
    return torre;
  }

  async findByCodigo ({ codigo }: TorreFindByCodigo) {
    const torre = await prisma.torre.findFirst({
      where: {
        codigo
      }
    })

    return torre
  }

  async delete({ id }: TorreDelete) {
    await prisma.torre.delete({
      where: {
        id,
      },
    });
  }

  async update({ id,  codigo, marca, modelo, categoria, status, tipo_torre, aterramento , altura, tipo_equipamento, station_id }: TorreUpdate) {
    const dataToUpdate:any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipo_torre,
      aterramento,
      altura,
    }
    if (station_id) {
      dataToUpdate.Station = {
        connect: {
          id: station_id
        }
      }
    }

    if (tipo_equipamento) {
      dataToUpdate.TipoEquipamento = {
        connect: {
          name: tipo_equipamento
        }
      }
    }
    return await prisma.torre.update({
      where: {
        id,
      },
      data: dataToUpdate
    });
  }

}