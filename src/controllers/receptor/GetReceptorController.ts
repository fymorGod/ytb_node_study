import { Request, Response } from "express";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";
import { GetReceptorService } from "../../services/receptor/GetReceptorService";


class GetReceptorController {
  async handle(req: Request, res: Response) {

    const prismaReceptorRepository = new PrismaReceptorRepository();

    const getReceptorsService = new GetReceptorService(prismaReceptorRepository);

    const receptor = await getReceptorsService.execute();

    if(receptor instanceof Error) {
      return res.status(400).send(receptor.message)
    }

    return res.status(200).send(receptor);
  }
}

export { GetReceptorController };