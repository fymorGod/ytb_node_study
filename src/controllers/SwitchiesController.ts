import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createswitchies = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, qtd_portas, tipo_equipamento} = req.body;
 
  const isSwitchiesCodigoUnique = await prisma.switchies.findUnique({
    where: {
      codigo
    }
  })


  if(isSwitchiesCodigoUnique) {
    return res.status(400).json({message: "Já existe um switchies com esse código"})
  }

  const switchies = await prisma.switchies.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      qtd_portas,
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(switchies);
}


export const getAllswitchies = async (req: Request, res: Response) => {
  const switchiess = await prisma.switchies.findMany(); 
  return res.json(switchiess);  
}