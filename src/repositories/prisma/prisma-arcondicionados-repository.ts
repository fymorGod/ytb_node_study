import { prisma } from "../../database/prisma";
import { ArcondicionadoCreateData, ArcondicionadoDelete, ArcondicionadoFind, ArcondicionadoFindByCodigo, ArcondicionadoRepository, ArcondicionadoUpdate } from "../interfaces/arcondicionado/arcondicionado-repository";


export const isStationIdValid = async ({ id }: any) => {

  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}

export class PrismaArcondicionadoRepository implements ArcondicionadoRepository {

  async create({
    codigo, marca, modelo, categoria, status, potencia, tensao, tipo_equipamento, station_id
  }: ArcondicionadoCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      potencia,
      tensao,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
    }

    if (station_id && (await isStationIdValid(station_id))) {
      data.Station = {
        connect: {
          id: station_id
        }
      };
    }
    return await prisma.arcondicionado.create({
      data
    });
  }

  async get() {
    const arcondicionados = await prisma.arcondicionado.findMany({
      select: {
        id: true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        potencia: true,
        tensao: true,
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
    return arcondicionados;
  }

  async find({ id }: ArcondicionadoFind) {
    const arcondicionado = await prisma.arcondicionado.findUnique({
       where: {
          id
        },
        select: {          
          codigo: true,
          marca: true,
          modelo: true,
          categoria: true,
          status: true,
          potencia: true,
          tensao: true,
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
    return arcondicionado;
  }

  async findByCodigo({ codigo }: ArcondicionadoFindByCodigo) {
    const arcondicionado = await prisma.arcondicionado.findUnique({
      where: {
        codigo
      }
    });

    return arcondicionado;
  }

  async delete({ id }: ArcondicionadoDelete) {
    await prisma.arcondicionado.delete({
      where: {
        id
      }
    });
  }

  async update({ id, codigo, marca, modelo, categoria, status, potencia, tensao, tipo_equipamento, station_id }: ArcondicionadoUpdate) {
    await prisma.arcondicionado.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        potencia,
        tensao,
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