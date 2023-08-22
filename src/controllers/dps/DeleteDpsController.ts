import { Request, Response } from "express";
import { PrismaDpsRepository } from "../../repositories/prisma/prisma-dps-repository";
import { DeleteDpsService } from "../../services/dps/DeleteDpsService";


class DeleteDpsController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaDpsRepository = new PrismaDpsRepository();

    const deleteDpsService = new DeleteDpsService(prismaDpsRepository);

    const dps = await deleteDpsService.execute({
      id,
    })

    if(dps instanceof Error) {
      return res.status(400).json({ error: dps.message });
    }

    return res.status(204).end();
  }
}

export { DeleteDpsController };