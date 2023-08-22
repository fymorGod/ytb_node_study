import { Request, Response } from "express";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { FindExaustorService } from "../../services/exaustor/FindExaustorService";

class FindExaustorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaExaustorRepository = new PrismaExaustorRepository();

    const findExaustorService = new FindExaustorService(prismaExaustorRepository);

    const exaustor = await findExaustorService.execute({ id });

    if(exaustor instanceof Error) {
      return res.status(400).json({ error: exaustor.message });
    }

    return res.status(200).send(exaustor);
  }
}

export { FindExaustorController };