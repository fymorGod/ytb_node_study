import { Request, Response } from "express";
import { PrismaCombinadorRepository } from "../../repositories/prisma/prisma-combinador-repository";
import { DeleteCombinadorService } from "../../services/combinador/DeleteCombinadorService";

class DeleteCombinadorController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaCombinadorRepository = new PrismaCombinadorRepository();

    const deleteCombinadorService = new DeleteCombinadorService(prismaCombinadorRepository);

    const combinador = await deleteCombinadorService.execute({
      id,
    })

    if(combinador instanceof Error) {
      return res.status(400).json({ error: combinador.message });
    }

    return res.status(204).end();
  }
}

export { DeleteCombinadorController };