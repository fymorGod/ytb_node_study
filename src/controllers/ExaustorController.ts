import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createExaustor = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento} = req.body;
 
  const isExaustorCodigoUnique = await prisma.exaustor.findUnique({
    where: {
      codigo
    }
  })
  if(isExaustorCodigoUnique) {
    return res.status(400).json({message: "Já existe um exaustor com esse código"})
  }

  const exaustor = await prisma.exaustor.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(exaustor);
}


export const getAllexaustor = async (req: Request, res: Response) => {
  const exaustors = await prisma.exaustor.findMany(); 
  return res.json(exaustors);  
}