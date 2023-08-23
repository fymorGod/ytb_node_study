import { prisma } from "../../database/prisma";
import { ReceptorCreateData, ReceptorDelete, ReceptorFind, ReceptorFindByCodigo, ReceptorRepository, ReceptorUpdate } from "../interfaces/receptor/receptor-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export const isParabolicaIdValid = async ({ id }: any) => {
  const parabolicaID = await prisma.parabolica.findUnique({
    where: {
      id
    }
  })
  return !!parabolicaID;
}
export class PrismaReceptorRepository implements ReceptorRepository {

  async create({ codigo, marca, modelo, categoria, status, frequencia, symbol_rate, tipo_equipamento, parabolica, station_id }: ReceptorCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      frequencia,
      symbol_rate,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
      Parabolica: {
        connect: {
          id: parabolica
        }
      }
    };

    if (parabolica && (await isParabolicaIdValid({ id: parabolica}))) {
      data.Parabolica = {
        connect: {
          id: parabolica
        }
      };
    }
  
    if (station_id && (await isStationIdValid({ id: station_id}))) {
      data.Station = {
        connect: {
          id: station_id
        }
      };
    }
  
    return await prisma.receptor.create({
      data,
    });
  }

  async get() {
    const receptor = await prisma.receptor.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        frequencia: true,
        symbol_rate: true,
        TipoEquipamento: {
          select: {
            name: true
          }
        },
        Parabolica: {
          select: {
            id: true,
          }
        },
        Station: {
          select: {
            name: true
          }
        },
        
      }
    });
    return receptor;
  }

  async find({ id }: ReceptorFind) {
    const receptor = await prisma.receptor.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        frequencia: true,
        symbol_rate: true,
        TipoEquipamento: {
          select: {
            name: true
          }
        },
        Parabolica: {
          select: {
            id: true,
          }
        },
        Station: {
          select: {
            name: true
          }
        },
        Transmissor: true,
      },
    });
    return receptor;
  }

  async findByCodigo ({ codigo }: ReceptorFindByCodigo) {
    const receptor = await prisma.receptor.findFirst({
      where: {
        codigo
      }
    })

    return receptor
  }

  async delete({ id }: ReceptorDelete) {
    await prisma.receptor.delete({
      where: {
        id,
      },
    });
  }

  async update({ id,  codigo, marca, modelo, categoria, status, frequencia, symbol_rate, tipo_equipamento, parabolica, station_id  }: ReceptorUpdate) {
    await prisma.receptor.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        frequencia,
        symbol_rate,
        TipoEquipamento: {
          connect: {
            id: tipo_equipamento
          },
        },
        Parabolica: {
          connect: {
            id: parabolica
          }
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