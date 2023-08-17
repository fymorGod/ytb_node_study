import { Request, Response } from "express";
import { PrismaCaboRepository } from "../../repositories/prisma/prisma-cabo-repository";
import { DeleteCaboService } from "../../services/cabos/DeleteCaboService";

class DeleteCaboController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaCaboRepository = new PrismaCaboRepository()

    const deleteCaboService = new DeleteCaboService(prismaCaboRepository);
    
    const cabo = await deleteCaboService.execute({
      id,
    });

    if(cabo instanceof Error) {
      return res.status(400).json({ error: cabo.message });
    }

    return res.status(204).end();
  }
}

export { DeleteCaboController };