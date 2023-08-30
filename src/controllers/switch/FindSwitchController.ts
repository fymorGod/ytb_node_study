import { Request, Response } from "express";
import { PrismaSwitchRepository } from "../../repositories/prisma/prisma-switch-repository";
import { FindSwitchService } from "../../services/switchies/FindSwitchService";

class FindSwitchController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaSwitchRepository = new PrismaSwitchRepository();

    const findSwitchService = new FindSwitchService(prismaSwitchRepository);

    const switchies = await findSwitchService.execute({ id });

    if(switchies instanceof Error) {
      return res.status(400).json({ error: switchies.message });
    }

    return res.status(200).send(switchies);
  }
}

export { FindSwitchController };