import { Request, Response } from "express";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { GetExaustorService } from "../../services/exaustor/GetExaustorService";

class GetExaustorController {
  async handle(req: Request, res: Response) {

    const prismaExaustorRepository = new PrismaExaustorRepository();

    const getExaustorService = new GetExaustorService(prismaExaustorRepository);

    const exaustor = await getExaustorService.execute();

    if(exaustor instanceof Error) {
      return res.status(400).send(exaustor.message)
    }

    return res.status(200).send(exaustor);
  }
}

export { GetExaustorController };