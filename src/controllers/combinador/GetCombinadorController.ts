import { Request, Response } from "express";
import { PrismaCombinadorRepository } from "../../repositories/prisma/prisma-combinador-repository";
import { GetCombinadorService } from "../../services/combinador/GetCombinadorService";

class GetCombinadorController {
  async handle(req: Request, res: Response) {

    const prismaCombinadorRepository = new PrismaCombinadorRepository();

    const getCombinadorService = new GetCombinadorService(prismaCombinadorRepository);

    const combinador = await getCombinadorService.execute();

    if(combinador instanceof Error) {
      return res.status(400).send(combinador.message)
    }

    return res.status(200).send(combinador);
  }
}

export { GetCombinadorController };