import { Request, Response } from "express";
import { PrismaSwitchRepository } from "../../repositories/prisma/prisma-switch-repository";
import { GetSwitchService } from "../../services/switchies/GetSwitchService";

class GetSwitchController {
  async handle(req: Request, res: Response) {

    const prismaSwitchRepository = new PrismaSwitchRepository();

    const getSwitchsService = new GetSwitchService(prismaSwitchRepository);

    const switchs = await getSwitchsService.execute();

    if(switchs instanceof Error) {
      return res.status(400).send(switchs.message)
    }

    return res.status(200).send(switchs);
  }
}

export { GetSwitchController };