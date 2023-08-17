import { Request, Response } from "express";
import { FindCaboService } from "../../services/cabos/FindCaboService";
import { PrismaCaboRepository } from "../../repositories/prisma/prisma-cabo-repository";

class FindCaboController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaCaboRepository = new PrismaCaboRepository();

    const findCaboService = new FindCaboService(prismaCaboRepository)

    const cabo = await prismaCaboRepository.find({
      id,
    });

    if( cabo instanceof Error) {
      return res.status(400).json({ error: cabo.message });
    }

    return res.status(200).send(cabo);
  }

}

export { FindCaboController };