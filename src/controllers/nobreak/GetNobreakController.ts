import { Request, Response } from "express";
import { PrismaNobreakRepository } from "../../repositories/prisma/prisma-nobreak-repository";
import { GetNobreakService } from "../../services/nobreak/GetNobreakService";


class GetNobreakController {
  async handle(req: Request, res: Response) {

    const prismaNobreakRepository = new PrismaNobreakRepository();

    const getNobreaksService = new GetNobreakService(prismaNobreakRepository);

    const nobreak = await getNobreaksService.execute();

    if(nobreak instanceof Error) {
      return res.status(400).send(nobreak.message)
    }

    return res.status(200).send(nobreak);
  }
}

export { GetNobreakController };