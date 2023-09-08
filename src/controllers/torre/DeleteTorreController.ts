import { Request, Response } from "express";
import { PrismaTorreRepository } from "../../repositories/prisma/prisma-torre-repository";
import { DeleteTorreService } from "../../services/torre/DeleteTorreService";



class DeleteTorreController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaTorreRepository = new PrismaTorreRepository();

    const deleteTorreService = new DeleteTorreService(prismaTorreRepository);

    const torre = await deleteTorreService.execute({
      id,
    })

    if(torre instanceof Error) {
      return res.status(400).json({ error: torre.message });
    }

    return res.status(204).end();
  }
}

export { DeleteTorreController };