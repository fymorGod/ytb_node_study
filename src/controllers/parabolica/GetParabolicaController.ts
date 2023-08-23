import { Request, Response } from "express";
import { GetParabolicaService } from "../../services/parabolica/GetParabolicaService";
import { PrismaParabolicaRepository } from "../../repositories/prisma/prisma-parabolica-repository";

class GetParabolicaController {
  async handle(req: Request, res: Response) {

    const prismaParabolicaRepository = new PrismaParabolicaRepository();

    const getParabolicasService = new GetParabolicaService(prismaParabolicaRepository);

    const parabolicas = await getParabolicasService.execute();

    if(parabolicas instanceof Error) {
      return res.status(400).send(parabolicas.message)
    }

    return res.status(200).send(parabolicas);
  }
}

export { GetParabolicaController };