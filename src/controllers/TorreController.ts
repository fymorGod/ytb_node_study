import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createtorre = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, tipo_torre, aterramento, altura, tipo_equipamento} = req.body;
 
  const isTorreCodigoUnique = await prisma.torre.findUnique({
    where: {
      codigo
    }
  })
  
  if(isTorreCodigoUnique) {
    return res.status(400).json({message: "Já existe um torre com esse código"})
  }

  const torre = await prisma.torre.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipo_torre,
      aterramento,
      altura,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(torre);
}


export const getAllTorre = async (req: Request, res: Response) => {
  const torres = await prisma.torre.findMany(); 
  return res.json(torres);  
}