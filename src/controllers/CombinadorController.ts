import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createCombinador = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, tipo_equipamento} = req.body;
 
  const isCombinadorCodigoUnique = await prisma.combinador.findUnique({
    where: {
      codigo
    }
  })
  
  if(isCombinadorCodigoUnique) {
    return res.status(400).json({message: "Já existe um combinador com esse código"})
  }

  const combinador = await prisma.combinador.create({
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

  return res.json(combinador);
}


export const getAllCombinador = async (req: Request, res: Response) => {
  const combinadors = await prisma.combinador.findMany(); 
  return res.json(combinadors);  
}