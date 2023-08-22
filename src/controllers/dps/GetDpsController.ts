import { Request, Response } from "express";
import { PrismaDpsRepository } from "../../repositories/prisma/prisma-dps-repository";
import { GetDpsService } from "../../services/dps/GetDpsService";

class GetDpsController {
  async handle(req: Request, res: Response) {

    const prismaDpsRepository = new PrismaDpsRepository();

    const getDpsService = new GetDpsService(prismaDpsRepository);

    const dps = await getDpsService.execute();

    if(dps instanceof Error) {
      return res.status(400).send(dps.message)
    }

    return res.status(200).send(dps);
  }
}

export { GetDpsController };