import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createArcondicionado = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, potencia, tensao, tipo_equipamento } = req.body;

  const isArcondicionadoCodigoUnique = await prisma.arcondicionado.findUnique({
    where: {
      codigo
    }
  })
  if(isArcondicionadoCodigoUnique) {
    return res.status(400).json({message: "Já existe um arcondicionado com esse código"})
  }
  const arcondicionado = await prisma.arcondicionado.create({
    data: {
      codigo, marca, categoria, modelo, potencia,status, tensao,TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        },
      },
    }
    });
    return res.json(arcondicionado);
}


export const getAllArcondicionados = async (req: Request, res: Response) => {
  const arcondicionados = await prisma.arcondicionado.findMany();
  return res.json(arcondicionados); 
}