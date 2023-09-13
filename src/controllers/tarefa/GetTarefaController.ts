import { Request, Response } from "express";
import { PrismaTarefaRepository } from "../../repositories/prisma/prisma-tarefa-repository";
import { GetTarefaService } from "../../services/tarefa/GetTarefaService";

class GetTarefaController {
  async handle(req: Request, res: Response) {

    const prismaTarefaRepository = new PrismaTarefaRepository();

    const getTarefasService = new GetTarefaService(prismaTarefaRepository);

    const tarefas = await getTarefasService.execute();

    if(tarefas instanceof Error) {
      return res.status(400).send(tarefas.message)
    }

    return res.status(200).send(tarefas);
  }
}

export { GetTarefaController };