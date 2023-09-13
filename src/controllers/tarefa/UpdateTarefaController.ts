import { Request, Response } from "express";
import { PrismaTarefaRepository } from "../../repositories/prisma/prisma-tarefa-repository";
import { UpdateTarefaService } from "../../services/tarefa/UpdateTarefaService";

class UpdateTarefaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { description, verificado, foto_verificado } = req.body;

    const prismaTarefaRepository = new PrismaTarefaRepository()

    const updateTarefaService = new UpdateTarefaService(prismaTarefaRepository);

    const tarefa = await updateTarefaService.execute({
      id,
      description,
      verificado,
      foto_verificado
    });

    if(tarefa instanceof Error) {
      return res.status(400).json({ error: tarefa.message });
    }

    return res.status(200).json({
      message: "Tarefa atualizada com sucesso!",
    });
  }
}

export { UpdateTarefaController };