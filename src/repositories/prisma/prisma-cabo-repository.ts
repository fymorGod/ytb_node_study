import { prisma } from "../../database/prisma";
import { CaboCreateData, CaboDelete, CaboFind, CaboFindByCodigo, CaboRepository, CaboUpdate } from "../interfaces/cabo/cabo-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export class PrismaCaboRepository implements CaboRepository {
  async create({ codigo, marca, modelo, categoria, status, tamanho, tipos_cabo, tipo_equipamento, station_id}: CaboCreateData) {
    const data: any = {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        tipos_cabo,
        tamanho,
        TipoEquipamento: {
          connect: {
            name: tipo_equipamento
          }
        },
    };
    if (station_id && (await isStationIdValid(station_id))) {
      data.Station = {
        connect: {
          id: station_id
        }
      };
    }

    return await prisma.cabo.create({ data });
  }

  async get() {
    const cabos = await prisma.cabo.findMany({
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        tipos_cabo: true,
        tamanho: true,
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

    return cabos;
  }

  async find({ id }: CaboFind) {
    const cabos = await prisma.cabo.findUnique({
      where: {
        id
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        tipos_cabo: true,
        tamanho: true,
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
    return cabos;
  }

  async findByCodigo({codigo}: CaboFindByCodigo) {
    const cabo = await prisma.cabo.findFirst({
      where: {
        codigo
      }
    });

    return cabo
  }
  async delete({ id }: CaboDelete) {
    await prisma.cabo.delete({
      where: {
        id,
      }
    });
  }

  async update({id, codigo, marca, modelo, categoria, status,tamanho, tipos_cabo, tipo_equipamento, station_id}: CaboUpdate) {
    await prisma.cabo.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        tipos_cabo,
        tamanho,
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