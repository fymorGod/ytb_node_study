import { prisma } from "../../database/prisma";
import { TelemetriaCreateData, TelemetriaDelete, TelemetriaFind, TelemetriaFindByCodigo, TelemetriaRepository, TelemetriaUpdate } from "../interfaces/telemetria/telemetria-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export class PrismaTelemetriaRepository implements TelemetriaRepository {
  async create({ codigo, marca, modelo, categoria, status, tipo_equipamento, station_id }: TelemetriaCreateData) {
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
    return await prisma.telemetria.create({
      data
    });
  }

  async get() {
    const telemetria = await prisma.telemetria.findMany({
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
    return telemetria;
  }

  async find({ id }: TelemetriaFind) {
    const telemetria = await prisma.telemetria.findUnique({
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
    return telemetria;
  }

  async findByCodigo ({ codigo }: TelemetriaFindByCodigo) {
    const telemetria = await prisma.telemetria.findFirst({
      where: {
        codigo
      }
    })

    return telemetria
  }

  async delete({ id }: TelemetriaDelete) {
    await prisma.telemetria.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, marca, modelo, categoria, station_id, tipo_equipamento, status }: TelemetriaUpdate) {
    const dataToUpdate:any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
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
    return await prisma.telemetria.update({
      where: {
        id,
      },
      data: dataToUpdate
    });
  }
}