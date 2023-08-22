import { Request, Response } from "express";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { DeleteExaustorService } from "../../services/exaustor/DeleteExaustorService";

class DeleteExaustorController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaExaustorRepository = new PrismaExaustorRepository();

    const deleteExaustorService = new DeleteExaustorService(prismaExaustorRepository);

    const exaustor = await deleteExaustorService.execute({
      id,
    })

    if(exaustor instanceof Error) {
      return res.status(400).json({ error: exaustor.message });
    }

    return res.status(204).end();
  }
}

export { DeleteExaustorController };