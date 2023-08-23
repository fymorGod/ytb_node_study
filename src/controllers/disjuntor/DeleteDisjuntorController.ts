import { Request, Response } from "express";
import { PrismaDisjuntorRepository } from "../../repositories/prisma/prisma-disjuntor-repository";
import { DeleteDisjuntorService } from "../../services/disjuntor/DeleteDisjuntorService";


class DeleteDisjuntorController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaDisjuntorRepository = new PrismaDisjuntorRepository();

    const deleteDisjuntorService = new DeleteDisjuntorService(prismaDisjuntorRepository);

    const disjuntores = await deleteDisjuntorService.execute({
      id,
    })

    if(disjuntores instanceof Error) {
      return res.status(400).json({ error: disjuntores.message });
    }

    return res.status(204).end();
  }
}

export { DeleteDisjuntorController };