import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createAntena = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, tipo_equipamento} = req.body;

  const isAntenaCodigoUnique = await prisma.antena.findUnique({
    where: {
      codigo
    }
  })

  if(isAntenaCodigoUnique) {
    return res.status(400).json({message: "Já existe uma Antena com esse código!"})
  }

  const antena = await prisma.antena.create({
    data: { codigo,marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, TipoEquipamento: {
      connect: {
        name: tipo_equipamento
      }
    } },
  });

  return res.json(antena);
}

export const getAllAntenas = async (req:Request, res: Response) => {
  const antenas = await prisma.antena.findMany()

  return res.json(antenas)
}