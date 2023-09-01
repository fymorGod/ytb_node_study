import { prisma } from "../../database/prisma";
import { StationCreateData, StationDelete, StationFind, StationFindByName, StationRepository, StationUpdate } from "../interfaces/station/station-repository";

export class PrismaStationRepository implements StationRepository {

  async create({ name, address, latitude, link_grafana, longitude, antena, arcondicionado, cabo, combinador, disjuntor, dps,exaustor,nobreak,quadro,receptor,switchies,telemetria,torre,transmissor }: StationCreateData) {
    const data: any = {
      name,
      address,
      latitude,
      link_grafana,
      longitude,
      antena, 
      arcondicionado, 
      cabo, 
      combinador, 
      disjuntor, 
      dps,
      exaustor,
      nobreak,
      quadro,
      receptor,
      switchies,
      telemetria,
      torre,
      transmissor
    };

    return await prisma.station.create({
      data,
    });
  }

  async get() {
    const station = await prisma.station.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        latitude: true,
        longitude: true,
        link_grafana: true,
        antena: true,
        arcondicionado: true,
        cabo: true,
        combinador: true,
        disjuntor: true,
        dps: true,
        exaustor: true,
        nobreak: true,
        parabolica: true,
        quadro: true,
        receptor: true,
        switchies: true,
        telemetria: true,
        torre: true,
        transmissor: true
      }
    });
    return station;
  }

  async find({ id }: StationFind) {
    const station = await prisma.station.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        address: true,
        latitude: true,
        longitude: true,
        link_grafana: true,
        antena: true,
        arcondicionado: true,
        cabo: true,
        combinador: true,
        disjuntor: true,
        dps: true,
        exaustor: true,
        nobreak: true,
        parabolica: true,
        quadro: true,
        receptor: true,
        switchies: true,
        telemetria: true,
        torre: true,
        transmissor: true
      },
    });
    return station;
  }

  async findByName({ name }: StationFindByName) {
    const station = await prisma.station.findFirst({
      where: {
        name
      }
    })

    return station
  }

  async delete({ id }: StationDelete) {
    await prisma.station.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, name, address, latitude, link_grafana, longitude, antena, arcondicionado, cabo, combinador, disjuntor, dps, exaustor, nobreak, quadro, receptor, switchies, telemetria, torre, transmissor}: StationUpdate) {
    await prisma.station.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        latitude,
        link_grafana,
        longitude,
        antena: {
          connect: {
            id: antena
          }
        }, 
        arcondicionado: {
          connect: {
            id: arcondicionado
          }
        }, 
        cabo: {
          connect: {
            id: cabo
          }
        }, 
        combinador: {
          connect: {
            id: combinador
          }
        }, 
        disjuntor: {
          connect: {
            id: disjuntor
          }
        }, 
        dps: {
          connect: {
            id: dps
          }
        },
        exaustor: {
          connect: {
            id: exaustor
          }
        },
        nobreak: {
          connect: {
            id: nobreak
          }
        },
        quadro: {
          connect: {
            id: quadro
          }
        },
        receptor: {
          connect: {
            id: receptor
          }
        },
        switchies: {
          connect: {
            id: switchies
          }
        },
        telemetria: {
          connect: {
            id: telemetria
          }
        },
        torre: {
          connect: {
            id: torre
          }
        },
        transmissor: {
          connect: {
            id: transmissor
          }
        }
      }
    }
    );
  }

}