import { Request, Response } from "express";
import { PrismaCaboRepository } from "../../repositories/prisma/prisma-cabo-repository";
import { GetCaboService } from "../../services/cabos/GetCaboService";

class GetCaboController {
  async handle(req: Request, res: Response) {

    const prismaCaboRepository = new PrismaCaboRepository()

    const getCaboService = new GetCaboService(prismaCaboRepository);

    const cabos = await getCaboService.execute();

    if( cabos instanceof Error) {
      return res.status(400).json({ error: cabos.message })
    }

    return res.status(200).json({
      message: 'Cabos retrieved successfully',
      data: cabos
    });
  }
}

export { GetCaboController };