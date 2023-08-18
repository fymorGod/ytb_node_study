
import { prisma } from "../../database/prisma";
import { DisjuntorCreateData, DisjuntorDelete, DisjuntorFind, DisjuntorFindByCodigo, DisjuntorRepository, DisjuntorUpdate } from "../interfaces/disjuntor/disjuntor-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export class PrismaDisjuntorRepository implements DisjuntorRepository {
  
  async create({ codigo, marca, modelo, categoria, status, corrente_maxima, tipo_equipamento, station_id }: DisjuntorCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      corrente_maxima,
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
  
    return await prisma.disjuntor.create({
      data
    });
  }

  async get() {
    const disjuntores = await prisma.disjuntor.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        corrente_maxima: true,
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
    return disjuntores;
  }

  async find({ id }: DisjuntorFind) {
    const disjuntores = await prisma.disjuntor.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        corrente_maxima: true,
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
    return disjuntores;
  }

  async findByCodigo ({ codigo }: DisjuntorFindByCodigo) {
    const disjuntores = await prisma.disjuntor.findFirst({
      where: {
        codigo
      }
    })

    return disjuntores
  }

  async delete({ id }: DisjuntorDelete) {
    await prisma.disjuntor.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, marca, modelo, categoria, corrente_maxima,station_id, tipo_equipamento, status, }: DisjuntorUpdate) {
    await prisma.disjuntor.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        corrente_maxima,
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