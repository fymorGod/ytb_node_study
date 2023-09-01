import { Request, Response } from "express";
import { PrismaTorreRepository } from "../../repositories/prisma/prisma-torre-repository";
import { GetTorreService } from "../../services/torre/GetTorreService";

class GetTorreController {
  async handle(req: Request, res: Response) {

    const prismaTorreRepository = new PrismaTorreRepository();

    const getTorresService = new GetTorreService(prismaTorreRepository);

    const torre = await getTorresService.execute();

    if(torre instanceof Error) {
      return res.status(400).send(torre.message)
    }

    return res.status(200).send(torre);
  }
}

export { GetTorreController };