import { Request, Response } from "express";
import { PrismaDisjuntorRepository } from "../../repositories/prisma/prisma-disjuntor-repository";
import { GetDisjuntorService } from "../../services/disjuntor/GetDisjuntorService";

class GetDisjuntorController {
  async handle(req: Request, res: Response) {

    const prismaDisjuntorRepository = new PrismaDisjuntorRepository();

    const getDisjuntorService = new GetDisjuntorService(prismaDisjuntorRepository);

    const disjuntores = await getDisjuntorService.execute();

    if(disjuntores instanceof Error) {
      return res.status(400).send(disjuntores.message)
    }

    return res.status(200).send(disjuntores);
  }
}

export { GetDisjuntorController };