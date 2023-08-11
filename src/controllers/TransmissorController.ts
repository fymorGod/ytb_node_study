import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createtransmissor = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one,acoplador_two,receptor, antena, tipo_equipamento} = req.body;
 
  const isTransmissorCodigoUnique = await prisma.transmissor.findUnique({
    where: {
      codigo
    }
  })
  
  if(isTransmissorCodigoUnique) {
    return res.status(400).json({message: "Já existe um transmissor com esse código"})
  }

  const transmissor = await prisma.transmissor.create({
    data: {
      codigo,
      marca,
      modelo,
      categoria,
      status,
      programmed,
      canal_fisico,
      canal_virtual,
      acoplador_one,
      acoplador_two,
      receptor: {
        connect: {
          id: receptor
        }
      },
      Antena: {
        connect: {
          id: antena
        }
      },
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    }
  });

  return res.json(transmissor);
}


export const getAllTransmissor = async (req: Request, res: Response) => {
  const transmissors = await prisma.transmissor.findMany(); 
  return res.json(transmissors);  
}