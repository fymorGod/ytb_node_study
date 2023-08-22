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
            name: true
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
    await prisma.exaustor.update({
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
            id: tipo_equipamento
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