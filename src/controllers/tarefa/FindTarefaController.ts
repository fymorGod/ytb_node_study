import { Request, Response } from "express";
import { PrismaTarefaRepository } from "../../repositories/prisma/prisma-tarefa-repository";
import { FindTarefaService } from "../../services/tarefa/FindTarefaService";
import { FindAntenaService } from "../../services/antenas/FindAntenaService";

class FindTarefaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaTarefaRepository = new PrismaTarefaRepository();

    const findTarefaService = new FindTarefaService(prismaTarefaRepository);

    const tarefa = await findTarefaService.execute({ id });

    if(tarefa instanceof Error) {
      return res.status(400).json({ error: tarefa.message });
    }

    return res.status(200).send(tarefa);
  }
}

export { FindTarefaController };