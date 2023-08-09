import { Request, Response } from "express"
import { prisma } from "../database/prisma"

interface TarefaInput {
  description: string;
  verificado: boolean;
  foto_verificado: boolean;
}
export const createChecklist = async (req: Request, res: Response) => {
  const {name, tarefas ,tipo_equipamento } = req.body

  const checklist = await prisma.checklist.create({
    data: {
      name,
      tarefa: {
        create: tarefas.map((tarefa: TarefaInput) => ({
          description: tarefa.description,
          verificado: tarefa.verificado,
          foto_verificado: tarefa.foto_verificado
        }))
      },
      TipoEquipamento: {
        connect: {
          name: tipo_equipamento
        }
      }
    },
    select: {
      id: true,
      name: true,
      tipoEquipamentoId: true,
      tarefa: {
        select: {
          id: true,
          description: true,
          verificado: true,
          foto_verificado: true
        }
      }
    }
  });

  return res.json(checklist)
};

export const getAllChecklists = async (req: Request, res: Response) => {
  const checklists = await prisma.checklist.findMany()
  return res.json(checklists);
}