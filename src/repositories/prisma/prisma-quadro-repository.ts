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
<<<<<<< HEAD
export const isDisjuntorIdValid = async ({ id }: any) => {
  const disjuntorID = await prisma.disjuntor.findUnique({
    where: {
      id
    }
  })
  return !!disjuntorID;
}
=======
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
export const isDpsIdValid = async ({ id }: any) => {
  const dpsID = await prisma.dps.findUnique({
    where: {
      id
    }
  })
  return !!dpsID;
}

<<<<<<< HEAD
export class PrismaQuadroRepository implements QuadroRepository {

  async create({ codigo, status, categoria, dps, disjuntor, tipo_equipamento, station_id }: QuadroCreateData) {
    const data: any = {
      codigo,
      status,
      categoria,
=======
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
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
    };
<<<<<<< HEAD

    if (disjuntor && (await isDisjuntorIdValid({ id: disjuntor}))) {
      data.Disjuntor = {
        connect: {
          id: disjuntor
        }
      };
    }
=======
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
    if (dps && (await isDpsIdValid({ id: dps}))) {
      data.Dps = {
        connect: {
          id: dps
        }
      };
    }
<<<<<<< HEAD
=======
  
    if (disjuntor && (await isDisjuntorIdValid({ id: disjuntor}))) {
      data.Disjuntor = {
        connect: {
          id: disjuntor
        }
      };
    }
  
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
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
<<<<<<< HEAD
        Disjuntor: {
=======
        Dps: {
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
          select: {
            id: true
          }
        },
<<<<<<< HEAD
        Dps: {
=======
        Disjuntor: {
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
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
<<<<<<< HEAD
        
=======
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
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
<<<<<<< HEAD
        Disjntor: {
=======
        Dps: {
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
          select: {
            id: true
          }
        },
<<<<<<< HEAD
        Dps: {
=======
        Disjuntor: {
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
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

<<<<<<< HEAD
  async update({ id, codigo, categoria, status, disjuntor, dps, station_id, tipo_equipamento}: QuadroUpdate) {
=======
  async update({ id, codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id }: QuadroUpdate) {
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
    await prisma.quadro.update({
      where: {
        id,
      },
      data: {
        codigo,
        categoria,
        status,
<<<<<<< HEAD
        Disjuntor: {
          connect: {
            id: disjuntor
          }
        },
        Dps: {
          connect: {
            id: dps
=======
        Dps: {
          connect: {
            id: dps
          },
        },
        Disjuntor: {
          connect: {
            id: disjuntor
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
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
<<<<<<< HEAD
       
=======
        
>>>>>>> 1f9b1d97e399ff10bd2f8db6d931510091224c7f
      }
    });
  }

}