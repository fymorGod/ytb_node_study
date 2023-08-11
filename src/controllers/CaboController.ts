
import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createCabo = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, tipo_equipamento} = req.body;
 
  const isCaboCodigoUnique = await prisma.cabo.findUnique({
    where: {
      codigo
    }
  })


  if(isCaboCodigoUnique) {
    return res.status(400).json({message: "Já existe um cabo com esse código"})
  }

  const cabo = await prisma.cabo.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipos_cabo,
      tamanho,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(cabo);
}


export const getAllcabo = async (req: Request, res: Response) => {
  const cabos = await prisma.cabo.findMany(); 
  return res.json(cabos);  
}