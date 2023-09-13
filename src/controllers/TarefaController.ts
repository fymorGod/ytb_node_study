import { Request, Response } from "express"
import { prisma } from "../database/prisma"

export const createTarefa = async (req: Request, res: Response) => {
  const { description, verificado, foto_verificado } = req.body

  const tarefa = await prisma.tarefa.create({
    data: {
      description,
      verificado,
      foto_verificado
    }
  });

  return res.json(tarefa)
};

export const getAllTarefas = async (req: Request, res: Response) => {
  const tarefas = await prisma.tarefa.findMany()
  return res.json(tarefas);
}