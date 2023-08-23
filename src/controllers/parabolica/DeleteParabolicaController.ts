import { Request, Response } from "express";
import { PrismaParabolicaRepository } from "../../repositories/prisma/prisma-parabolica-repository";
import { DeleteParabolicaService } from "../../services/parabolica/DeleteParabolicaService";


class DeleteParabolicaController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaParabolicaRepository = new PrismaParabolicaRepository();

    const deleteParabolicaService = new DeleteParabolicaService(prismaParabolicaRepository);

    const parabolica = await deleteParabolicaService.execute({
      id,
    })

    if(parabolica instanceof Error) {
      return res.status(400).json({ error: parabolica.message });
    }

    return res.status(204).end();
  }
}

export { DeleteParabolicaController };