import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { FindAntenaService } from "../../services/antenas/FindTorreService";

class FindAntenaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaAntenaRepository = new PrismaAntenaRepository();

    const findAntenaService = new FindAntenaService(prismaAntenaRepository);

    const antena = await findAntenaService.execute({ id });

    if(antena instanceof Error) {
      return res.status(400).json({ error: antena.message });
    }

    return res.status(200).send(antena);
  }
}

export { FindAntenaController };