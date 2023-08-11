import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createNobreak = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento} = req.body;
 
  const isNobreakCodigoUnique = await prisma.nobreak.findUnique({
    where: {
      codigo
    }
  })
  
  if(isNobreakCodigoUnique) {
    return res.status(400).json({message: "Já existe um nobreak com esse código"})
  }

  const nobreak = await prisma.nobreak.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tensao_entrada,
      tensao_saida,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(nobreak);
}


export const getAllNobreak = async (req: Request, res: Response) => {
  const nobreaks = await prisma.nobreak.findMany(); 
  return res.json(nobreaks);  
}