import { prisma } from "../../database/prisma";
import { QuadroCreateData, QuadroDelete, QuadroFind, QuadroFindByCodigo, QuadroRepository, QuadroUpdate } from "../interfaces/quadro/quadro-repository";


export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}
export const isDpsIdValid = async ({ id }: any) => {
  const dpsID = await prisma.dps.findUnique({
    where: {
      id
    }
  })
  return !!dpsID;
}

export const isDisjuntorIdValid = async ({ id }: any) => {
  const disjuntorID = await prisma.disjuntor.findUnique({
    where: {
      id
    }
  })
  return !!disjuntorID;
}

export class PrismaQuadroRepository implements QuadroRepository {

  async create({ codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id }: QuadroCreateData) {
    const data: any = {
      codigo,
      categoria,
      status,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
    };
    if (dps && (await isDpsIdValid({ id: dps}))) {
      data.Dps = {
        connect: {
          id: dps
        }
      };
    }
  
    if (disjuntor && (await isDisjuntorIdValid({ id: disjuntor}))) {
      data.Disjuntor = {
        connect: {
          id: disjuntor
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
  
    return await prisma.quadro.create({
      data,
    });
  }

  async get() {
    const quadro = await prisma.quadro.findMany({
      select: {
        id:true,
        codigo: true,
        categoria: true,
        status: true,
        Dps: {
          select: {
            id: true
          }
        },
        Disjuntor: {
          select: {
            id: true
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
    return quadro;
  }

  async find({ id }: QuadroFind) {
    const quadro = await prisma.quadro.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        categoria: true,
        status: true,
        Dps: {
          select: {
            id: true
          }
        },
        Disjuntor: {
          select: {
            id: true
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
    return quadro;
  }

  async findByCodigo ({ codigo }: QuadroFindByCodigo) {
    const quadro = await prisma.quadro.findFirst({
      where: {
        codigo
      }
    })

    return quadro
  }

  async delete({ id }: QuadroDelete) {
    await prisma.quadro.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id }: QuadroUpdate) {
    await prisma.quadro.update({
      where: {
        id,
      },
      data: {
        codigo,
        categoria,
        status,
        Dps: {
          connect: {
            id: dps
          },
        },
        Disjuntor: {
          connect: {
            id: disjuntor
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