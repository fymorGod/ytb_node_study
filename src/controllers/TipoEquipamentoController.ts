import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const createTipoEquipamento = async (req: Request, res: Response) => {
  const { name } = req.body;

  const isTipoEquipamentoNameUnique = await prisma.tipoEquipamento.findUnique({
    where: {
      name
    }
  });

  if(isTipoEquipamentoNameUnique) {
    return res.status(400).json({message: "Já existe um tipo equipamento com esse nome!"})
  }

  const tipo_equipamento = await prisma.tipoEquipamento.create({
    data: { name },
  });

  return res.json(tipo_equipamento);
}

export const getAllTipoEquipamentos = async (req: Request, res: Response) => {
  const tipo_equipamentos = await prisma.tipoEquipamento.findMany();

  return res.json(tipo_equipamentos);
}