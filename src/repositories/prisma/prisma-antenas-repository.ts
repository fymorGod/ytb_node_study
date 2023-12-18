import { prisma } from "../../database/prisma";

import { AntenaCreateData, AntenaDelete, AntenaFind, AntenaFindByCodigo, AntenaRepository, AntenaUpdate } from "../interfaces/antena/antena-repository";

export const isStationIdValid = async ({ id }: any) => {
  const stationID = await prisma.station.findUnique({
    where: {
      id
    }
  })
  return !!stationID;
}
export class PrismaAntenaRepository implements AntenaRepository {

  async create({ codigo, marca, modelo, categoria, status, gain, posicao_torre, tipo_equipamento, tipos_antena, vr, station_id }: AntenaCreateData) {
    const data: any = {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      gain,
      posicao_torre,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      },
      tipos_antena,
      vr,
    };

    if (station_id && (await isStationIdValid({ id: station_id }))) {
      data.Station = {
        connect: {
          id: station_id
        }
      };
    }

    return await prisma.antena.create({
      data,
    });
  }

  async get() {
    const antenas = await prisma.antena.findMany({
      select: {
        id: true,
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        gain: true,
        tipos_antena: true,
        posicao_torre: true,
        vr: true,
        Documento_Antenas: {
          select: {
            documento:  true
          }
        },
        TipoEquipamento: {
          select: {
            name: true,
            checklist: {
              select: {
                id: true,
                name: true,
                tarefa: true
              }
            }
          }
        },
        Station: {
          select: {
            name: true
          }
        },
        transmissores: true
      }
    });
    
    return antenas;
  }

  async find({ id }: AntenaFind) {
    const antena = await prisma.antena.findUnique({
      where: {
        id,
      },
      select: {
        codigo: true,
        marca: true,
        modelo: true,
        categoria: true,
        status: true,
        gain: true,
        tipos_antena: true,
        posicao_torre: true,
        vr: true,
        TipoEquipamento: {
          select: {
            name: true,
            checklist: {
              select: {
                id: true,
                name: true,
                tarefa: true
              }
            }
          }
        },
        Station: {
          select: {
            name: true,
            address: true,
            id: true,
            latitude: true,
            link_grafana: true,
            longitude: true,
            manutencao: {
              select: {
                checklist: true,
                dataCreate: true,
                observacao: true,
                stationId: true,
                status: true,
                tipo: true,
                User: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    empresa: true,
                    contato_empresa: true,
                    Access: {
                      select: {
                        name: true
                      }
                    }
                  }
                },
                Station: {
                  select: {
                    name: true,
                    address: true,
                  }
                }
              }
            }
          }
        },
        Documento_Antenas: {
          select: {
            documento: true
          }
        },
        transmissores: true,
      },
    });
    return antena;
  }

  async findByCodigo({ codigo }: AntenaFindByCodigo) {
    const antena = await prisma.antena.findFirst({
      where: {
        codigo
      }
    })

    return antena
  }

  async delete({ id }: AntenaDelete) {
    try {
      // Remova a antena com base no ID
      await prisma.antena.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`An error occurred while deleting the antena: ${error}`);
    } finally {
      await prisma.$disconnect(); // Feche a conexão com o Prisma
    }
  }
async update({ id, codigo, marca, modelo, categoria, gain, posicao_torre, station_id, tipo_equipamento, tipos_antena, status, vr, transmissores }: AntenaUpdate) {
    const data: any = {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        gain,
        posicao_torre,
        tipos_antena,
        vr,
        transmissores: {},
        TipoEquipamento: {},
        Station: {},
    };

    if (tipo_equipamento) {
        data.TipoEquipamento.connect = { id: tipo_equipamento };
    }

    if (station_id) {
        data.Station.connect = { id: station_id };
    }

    if (transmissores) {
        data.transmissores.connect = { id: transmissores };
    }

    await prisma.antena.update({
        where: {
            id,
        },
        data,
    });
}


}