import { Request, Response } from "express";
import { PrismaDpsRepository } from "../../repositories/prisma/prisma-dps-repository";
import { FindDpsService } from "../../services/dps/FindDpsService";

class FindDpsController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaDpsRepository = new PrismaDpsRepository();

    const findDpsService = new FindDpsService(prismaDpsRepository);

    const dps = await findDpsService.execute({ id });

    if(dps instanceof Error) {
      return res.status(400).json({ error: dps.message });
    }

    return res.status(200).send(dps);
  }
}

export { FindDpsController };