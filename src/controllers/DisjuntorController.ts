import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createDisjuntor = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, corrente_maxima, tipo_equipamento} = req.body;
 
  const isDisjuntorCodigoUnique = await prisma.disjuntor.findUnique({
    where: {
      codigo
    }
  })
  
  if(isDisjuntorCodigoUnique) {
    return res.status(400).json({message: "Já existe um disjuntor com esse código"})
  }

  const disjuntor = await prisma.disjuntor.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      corrente_maxima,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(disjuntor);
}


export const getAlldisjuntor = async (req: Request, res: Response) => {
  const disjuntors = await prisma.disjuntor.findMany(); 
  return res.json(disjuntors);  
}