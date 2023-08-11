import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createParabolica = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, diametro, satelite,  tipo_equipamento} = req.body;
 
  const isParabolicaCodigoUnique = await prisma.parabolica.findUnique({
    where: {
      codigo
    }
  })
  if(isParabolicaCodigoUnique) {
    return res.status(400).json({message: "Já existe um parabolica com esse código"})
  }

  const parabolica = await prisma.parabolica.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      diametro,
      satelite,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(parabolica);
}


export const getAllParabolica = async (req: Request, res: Response) => {
  const parabolicas = await prisma.parabolica.findMany(); 
  return res.json(parabolicas);  
}