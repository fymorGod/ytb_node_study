import { Request, Response } from "express";
import { PrismaNobreakRepository } from "../../repositories/prisma/prisma-nobreak-repository";
import { DeleteNobreakService } from "../../services/nobreak/DeleteNobreakService";

class DeleteNobreakController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaNobreakRepository = new PrismaNobreakRepository();

    const deleteNobreakService = new DeleteNobreakService(prismaNobreakRepository);

    const nobreak = await deleteNobreakService.execute({
      id,
    })

    if(nobreak instanceof Error) {
      return res.status(400).json({ error: nobreak.message });
    }

    return res.status(204).end();
  }
}

export { DeleteNobreakController };