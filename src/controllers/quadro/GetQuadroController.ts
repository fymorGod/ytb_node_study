import { Request, Response } from "express";
import { PrismaQuadroRepository } from "../../repositories/prisma/prisma-quadro-repository";
import { GetQuadroService } from "../../services/quadro/GetQuadroService";

class GetQuadroController {
  async handle(req: Request, res: Response) {

    const prismaQuadroRepository = new PrismaQuadroRepository();

    const getQuadrosService = new GetQuadroService(prismaQuadroRepository);

    const quadro = await getQuadrosService.execute();

    if(quadro instanceof Error) {
      return res.status(400).send(quadro.message)
    }

    return res.status(200).send(quadro);
  }
}

export { GetQuadroController };