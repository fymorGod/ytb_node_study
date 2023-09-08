import { Request, Response } from "express";
import { PrismaQuadroRepository } from "../../repositories/prisma/prisma-quadro-repository";
import { DeleteQuadroService } from "../../services/quadro/DeleteQuadroService";

class DeleteQuadroController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaQuadroRepository = new PrismaQuadroRepository();

    const deleteQuadroService = new DeleteQuadroService(prismaQuadroRepository);

    const quadro = await deleteQuadroService.execute({
      id,
    })

    if(quadro instanceof Error) {
      return res.status(400).json({ error: quadro.message });
    }

    return res.status(204).end();
  }
}

export { DeleteQuadroController };