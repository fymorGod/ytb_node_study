import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { DeleteAntenaService } from "../../services/antenas/DeleteAntenaService";


class DeleteAntenaController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaAntenaRepository = new PrismaAntenaRepository();

    const deleteAntenaService = new DeleteAntenaService(prismaAntenaRepository);

    const antena = await deleteAntenaService.execute({
      id,
    })

    if(antena instanceof Error) {
      return res.status(400).json({ error: antena.message });
    }

    return res.status(204).end();
  }
}

export { DeleteAntenaController };