import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createtelemetria = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, tipo_equipamento} = req.body;
 
  const isTelemetriaCodigoUnique = await prisma.telemetria.findUnique({
    where: {
      codigo
    }
  })
  
  if(isTelemetriaCodigoUnique) {
    return res.status(400).json({message: "Já existe um telemetria com esse código"})
  }

  const telemetria = await prisma.telemetria.create({
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

  return res.json(telemetria);
}


export const getAlltelemetria = async (req: Request, res: Response) => {
  const telemetrias = await prisma.telemetria.findMany(); 
  return res.json(telemetrias);  
}