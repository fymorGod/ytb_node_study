import { Request, Response } from "express"
import { prisma } from "../database/prisma";
// import path from 'path';

export const createAntena = async (req: Request, res: Response) => {
  const { codigo, marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, tipo_equipamento } = req.body;
  // const requestDocuments = req.files as Express.Multer.File[];

  // const documentos = requestDocuments.map((doc) => {
  //   return {
  //     path: doc.filename,
  //   };
  // });

  const isAntenaCodigoUnique = await prisma.antena.findUnique({
    where: {
      codigo
    }
  })

  if(isAntenaCodigoUnique) {
    return res.status(400).json({message: "Já existe uma Antena com esse código!"})
  }

  const antena = await prisma.antena.create({
    data: { codigo,marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, TipoEquipamento: {
      connect: {
        name: tipo_equipamento
      }
    }
  }
    // documents: {
    //   create: documentos,
    // }
  },
);

  return res.json(antena);
}

export const getAllAntenas = async (req:Request, res: Response) => {
  const antenas = await prisma.antena.findMany()

  return res.json(antenas)
}