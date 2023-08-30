import { Request, Response } from "express";
import { PrismaTorreRepository } from "../../repositories/prisma/prisma-torre-repository";
import { FindTorreService } from "../../services/transmissor/FindTransmissorService";


class FindTorreController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaTorreRepository = new PrismaTorreRepository();

    const findTorreService = new FindTorreService(prismaTorreRepository);

    const torre = await findTorreService.execute({ id });

    if(torre instanceof Error) {
      return res.status(400).json({ error: torre.message });
    }

    return res.status(200).send(torre);
  }
}

export { FindTorreController };