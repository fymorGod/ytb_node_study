import { Request, Response } from "express";
import { PrismaCombinadorRepository } from "../../repositories/prisma/prisma-combinador-repository";
import { FindCombinadorService } from "../../services/combinador/FindCombinadorService";


class FindCombinadorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaCombinadorRepository = new PrismaCombinadorRepository();

    const findCombinadorService = new FindCombinadorService(prismaCombinadorRepository);

    const combinador = await findCombinadorService.execute({ id });

    if(combinador instanceof Error) {
      return res.status(400).json({ error: combinador.message });
    }

    return res.status(200).send(combinador);
  }
}

export { FindCombinadorController };