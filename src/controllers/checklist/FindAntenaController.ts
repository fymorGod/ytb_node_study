import { Request, Response } from "express";
import { PrismaChecklistRepository } from "../../repositories/prisma/prisma-checklist-repository";
import { FindChecklistService } from "../../services/checklist/FindChecklistService";

class FindChecklistController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaChecklistRepository = new PrismaChecklistRepository();

    const findChecklistService = new FindChecklistService(prismaChecklistRepository);

    const checklist = await findChecklistService.execute({ id });

    if(checklist instanceof Error) {
      return res.status(400).json({ error: checklist.message });
    }

    return res.status(200).send(checklist);
  }
}

export { FindChecklistController };