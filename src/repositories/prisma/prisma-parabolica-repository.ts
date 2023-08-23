import { prisma } from "../../database/prisma";
import { ParabolicaCreateData, ParabolicaDelete, ParabolicaFind, ParabolicaFindByCodigo, ParabolicaRepository, ParabolicaUpdate } from "../interfaces/parabolica/parabolica-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}
export class PrismaParabolicaRepository implements ParabolicaRepository {

  async create({ codigo, marca, modelo, categoria, status, diametro, satelite, tipo_equipamento, station_id }: ParabolicaCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      diametro,
      satelite,
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
  
    return await prisma.parabolica.create({
      data,
    });
  }

  async get() {
    const parabolica = await prisma.parabolica.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        diametro: true,
        satelite: true,
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
        receptor: {
          select: {
            id: true
          }
        }
      }
    });
    return parabolica;
  }

  async find({ id }: ParabolicaFind) {
    const parabolica = await prisma.parabolica.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        diametro: true,
        satelite: true,
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
        receptor: true,
      },
    });
    return parabolica;
  }

  async findByCodigo ({ codigo }: ParabolicaFindByCodigo) {
    const parabolica = await prisma.parabolica.findFirst({
      where: {
        codigo
      }
    })

    return parabolica
  }

  async delete({ id }: ParabolicaDelete) {
    await prisma.parabolica.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, marca, modelo, categoria, status, diametro, satelite, tipo_equipamento, station_id, receptor_id }: ParabolicaUpdate) {
    await prisma.parabolica.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        diametro,
        satelite,
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
        receptor: {
          connect: {
            id: receptor_id
          },
        }
      }
    });
  }
}