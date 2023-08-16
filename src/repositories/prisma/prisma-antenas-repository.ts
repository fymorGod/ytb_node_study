import { prisma } from "../../database/prisma";

import { AntenaCreateData, AntenaDelete, AntenaFind, AntenaRepository, AntenaUpdate } from "../interfaces/antena/antena-repository";


export class PrismaAntenaRepository implements AntenaRepository {
  async create({ codigo, marca, modelo, categoria, status, gain, posicao_torre, tipo_equipamento, tipos_antena, vr, station_id}: AntenaCreateData) {
    return await prisma.antena.create({
      data: {
        codigo,
        marca,
        modelo,
        categoria,
        status,
        gain,
        posicao_torre, 
        tipo_equipamento,
        tipos_antena,
        vr,
        station_id
      }
    });
  }
}