import { Request, Response } from "express";
import { PrismaNobreakRepository } from "../../repositories/prisma/prisma-nobreak-repository";
import { FindNobreakService } from "../../services/nobreak/FindNobreakService";

class FindNobreakController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaNobreakRepository = new PrismaNobreakRepository();

    const findNobreakService = new FindNobreakService(prismaNobreakRepository);

    const nobreak = await findNobreakService.execute({ id });

    if(nobreak instanceof Error) {
      return res.status(400).json({ error: nobreak.message });
    }

    return res.status(200).send(nobreak);
  }
}

export { FindNobreakController };