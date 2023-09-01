import { prisma } from "../../database/prisma";
import { DpsCreateData, DpsDelete, DpsFind, DpsFindByCodigo, DpsRepository, DpsUpdate } from "../interfaces/dps/dps-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export const isQuadroIdValid = async ({ id }: any) => {
  const quadroID = await prisma.quadro.findUnique({
    where: {
      id
    }
  })
  return !!quadroID;
}

export class PrismaDpsRepository implements DpsRepository {

  async create({ codigo, marca, modelo, categoria, status, corrente_maxima, classe_dps, quadro, tipo_equipamento, station_id }: DpsCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      corrente_maxima,
      classe_dps,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
    };
    if (quadro && (await isQuadroIdValid({ id: quadro}))) {
      data.Quadro = {
        connect: {
          id: quadro
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
  
    return await prisma.dps.create({
      data,
    });
  }

  async get() {
    const dps = await prisma.dps.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        Quadro: {
          select: {
            codigo: true
          }
        },
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
    return dps;
  }

  async find({ id }: DpsFind) {
    const dps = await prisma.dps.findUnique({
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
        classe_dps: true,
        Quadro: {
          select: {
            codigo: true
          }
        },
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
    return dps;
  }

  async findByCodigo ({ codigo }: DpsFindByCodigo) {
    const dps = await prisma.dps.findFirst({
      where: {
        codigo
      }
    })

    return dps
  }

  async delete({ id }: DpsDelete) {
    await prisma.dps.delete({
      where: {
        id,
      },
    });
  }

  async update({ id,codigo, marca, modelo, categoria, status, corrente_maxima, classe_dps, quadro, tipo_equipamento, station_id }: DpsUpdate) {
    await prisma.dps.update({
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
        classe_dps,
        Quadro: {
          connect: {
            codigo: quadro
          }
        },
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