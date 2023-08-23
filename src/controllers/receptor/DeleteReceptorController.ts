import { Request, Response } from "express";
import { DeleteReceptorService } from "../../services/receptor/DeleteReceptorService";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";


class DeleteReceptorController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaReceptorRepository = new PrismaReceptorRepository();

    const deleteReceptorService = new DeleteReceptorService(prismaReceptorRepository);

    const receptor = await deleteReceptorService.execute({
      id,
    })

    if(receptor instanceof Error) {
      return res.status(400).json({ error: receptor.message });
    }

    return res.status(204).end();
  }
}

export { DeleteReceptorController };