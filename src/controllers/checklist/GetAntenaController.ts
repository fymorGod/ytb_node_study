import { Request, Response } from "express";
import { PrismaChecklistRepository } from "../../repositories/prisma/prisma-checklist-repository";
import { GetChecklistService } from "../../services/checklist/GetChecklistService";

class GetChecklistController {
  async handle(req: Request, res: Response) {

    const prismaChecklistRepository = new PrismaChecklistRepository();

    const getChecklistsService = new GetChecklistService(prismaChecklistRepository);

    const checklist = await getChecklistsService.execute();

    if(checklist instanceof Error) {
      return res.status(400).send(checklist.message)
    }

    return res.status(200).send(checklist);
  }
}

export { GetChecklistController };