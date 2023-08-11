import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createDps = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, classe_dps, corrente_maxima, tipo_equipamento} = req.body;
 
  const isDpsCodigoUnique = await prisma.dps.findUnique({
    where: {
      codigo
    }
  })
  
  if(isDpsCodigoUnique) {
    return res.status(400).json({message: "Já existe um nobreak com esse código"})
  }

  const dps = await prisma.dps.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      classe_dps,
      corrente_maxima,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(dps);
}

export const getAllDps = async (req: Request, res: Response) => {
  const dps = await prisma.dps.findMany(); 
  return res.json(dps);  
}