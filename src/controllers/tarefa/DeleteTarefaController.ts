import { Request, Response } from "express";
import { PrismaTarefaRepository } from "../../repositories/prisma/prisma-tarefa-repository";
import { DeleteTarefaService } from "../../services/tarefa/DeleteTarefaService";

class DeleteTarefaController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaTarefaRepository = new PrismaTarefaRepository();

    const deleteTarefaService = new DeleteTarefaService(prismaTarefaRepository);

    const tarefa = await deleteTarefaService.execute({
      id,
    })

    if(tarefa instanceof Error) {
      return res.status(400).json({ error: tarefa.message });
    }

    return res.status(204).end();
  }
}

export { DeleteTarefaController };