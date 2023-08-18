import { Request, Response } from "express";
import { PrismaDisjuntorRepository } from "../../repositories/prisma/prisma-disjuntor-repository";
import { FindDisjuntorService } from "../../services/disjuntor/FindDisjuntorService";

class FindDisjuntorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaDisjuntorRepository = new PrismaDisjuntorRepository();

    const findDisjuntorService = new FindDisjuntorService(prismaDisjuntorRepository);

    const disjuntores = await findDisjuntorService.execute({ id });

    if(disjuntores instanceof Error) {
      return res.status(400).json({ error: disjuntores.message });
    }

    return res.status(200).send(disjuntores);
  }
}

export { FindDisjuntorController };