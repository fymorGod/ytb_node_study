import { Request, Response } from "express";
import { PrismaSwitchRepository } from "../../repositories/prisma/prisma-switch-repository";
import { DeleteSwitchService } from "../../services/switchies/DeleteSwitchService";



class DeleteSwitchController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaSwitchRepository = new PrismaSwitchRepository();

    const deleteSwitchService = new DeleteSwitchService(prismaSwitchRepository);

    const switchies = await deleteSwitchService.execute({
      id,
    })

    if(switchies instanceof Error) {
      return res.status(400).json({ error: switchies.message });
    }

    return res.status(204).end();
  }
}

export { DeleteSwitchController };