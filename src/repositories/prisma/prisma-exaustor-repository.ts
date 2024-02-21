import { prisma } from "../../database/prisma";
import { ExaustorCreateData, ExaustorDelete, ExaustorFind, ExaustorFindByCodigo, ExaustorRepository, ExaustorUpdate } from "../interfaces/exaustor/exaustor-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export class PrismaExaustorRepository implements ExaustorRepository {
  async create({ codigo, marca, modelo, categoria, status, tipo_equipamento, station_id}: ExaustorCreateData) {
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
    return await prisma.exaustor.create({
      data
    });
  }
  
  async get() {
    const exaustor = await prisma.exaustor.findMany({
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
    return exaustor;
  }

  async find({ id }: ExaustorFind) {
    const exaustor = await prisma.exaustor.findUnique({
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
    return exaustor;
  }

  async findByCodigo ({ codigo }: ExaustorFindByCodigo) {
    const exaustor = await prisma.exaustor.findFirst({
      where: {
        codigo
      }
    })

    return exaustor
  }

  async delete({ id }: ExaustorDelete) {
    await prisma.exaustor.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, marca, modelo, categoria, station_id, tipo_equipamento, status }: ExaustorUpdate) {
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
    return await prisma.exaustor.update({
      where: {
        id,
      },
      data: dataToUpdate
    });
  }
}