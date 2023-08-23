import { Request, Response } from "express";
import { FindParabolicaService } from "../../services/parabolica/FindParabolicaService";
import { PrismaParabolicaRepository } from "../../repositories/prisma/prisma-parabolica-repository";

class FindParabolicaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaParabolicaRepository = new PrismaParabolicaRepository();

    const findParabolicaService = new FindParabolicaService(prismaParabolicaRepository);

    const parabolica = await findParabolicaService.execute({ id });

    if(parabolica instanceof Error) {
      return res.status(400).json({ error: parabolica.message });
    }

    return res.status(200).send(parabolica);
  }
}

export { FindParabolicaController };