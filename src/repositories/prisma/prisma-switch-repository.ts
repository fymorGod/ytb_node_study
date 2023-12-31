import { prisma } from "../../database/prisma";

import { SwitchCreateData, SwitchDelete, SwitchFind, SwitchFindByCodigo, SwitchRepository, SwitchUpdate } from "../interfaces/switchies/switchies-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}
export class PrismaSwitchRepository implements SwitchRepository {

  async create({ codigo, marca, modelo, categoria, status, qtd_portas, tipo_equipamento, station_id }: SwitchCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      qtd_portas,
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
  
    return await prisma.switchies.create({
      data,
    });
  }

  async get() {
    const switchies = await prisma.switchies.findMany({
      select: {
        id:true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        qtd_portas: true,
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
    return switchies;
  }

  async find({ id }: SwitchFind) {
    const switchies = await prisma.switchies.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        qtd_portas: true,
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
    return switchies;
  }

  async findByCodigo ({ codigo }: SwitchFindByCodigo) {
    const switchies = await prisma.switchies.findFirst({
      where: {
        codigo
      }
    })

    return switchies
  }

  async delete({ id }: SwitchDelete) {
    await prisma.switchies.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, codigo, marca, modelo, categoria, qtd_portas, status,station_id, tipo_equipamento }: SwitchUpdate) {
    await prisma.switchies.update({
      where: {
        id,
      },
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        qtd_portas,
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