import { Request, Response } from "express";
import { PrismaQuadroRepository } from "../../repositories/prisma/prisma-quadro-repository";
import { FindQuadroService } from "../../services/quadro/FindQuadroService";

class FindQuadroController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaQuadroRepository = new PrismaQuadroRepository();

    const findQuadroService = new FindQuadroService(prismaQuadroRepository);

    const quadro = await findQuadroService.execute({ id });

    if(quadro instanceof Error) {
      return res.status(400).json({ error: quadro.message });
    }

    return res.status(200).send(quadro);
  }
}

export { FindQuadroController };