import { Request, Response } from "express";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";
import { FindReceptorService } from "../../services/receptor/FindReceptorService";

class FindReceptorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaReceptorRepository = new PrismaReceptorRepository();

    const findReceptorService = new FindReceptorService(prismaReceptorRepository);

    const receptor = await findReceptorService.execute({ id });

    if(receptor instanceof Error) {
      return res.status(400).json({ error: receptor.message });
    }

    return res.status(200).send(receptor);
  }
}

export { FindReceptorController };