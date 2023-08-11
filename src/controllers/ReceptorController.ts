import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createReceptor = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, frequencia, symbol_rate, parabolica, tipo_equipamento} = req.body;
 
  const isReceptorCodigoUnique = await prisma.receptor.findUnique({
    where: {
      codigo
    }
  })


  if(isReceptorCodigoUnique) {
    return res.status(400).json({message: "Já existe um receptor com esse código"})
  }

  const receptor = await prisma.receptor.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      frequencia,
      symbol_rate,
      Parabolica: {
        connect: {
          id: parabolica
        }
      },
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(receptor);
}


export const getAllreceptor = async (req: Request, res: Response) => {
  const receptors = await prisma.receptor.findMany(); 
  return res.json(receptors);  
}