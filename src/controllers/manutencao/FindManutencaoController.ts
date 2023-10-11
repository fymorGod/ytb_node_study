import { Request, Response } from "express";
import { PrismaManutencaoRepository } from "../../repositories/prisma/prisma-manutencao-repository";
import { FindManutencaoService } from "../../services/manutencao/FindManutencaoService";

class FindManutencaoController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaManutencaoRepository = new PrismaManutencaoRepository();

    const findManutencaoService = new FindManutencaoService(prismaManutencaoRepository);

    const manutencao = await findManutencaoService.execute({ id });

    if(manutencao instanceof Error) {
      return res.status(400).json({ error: manutencao.message });
    }

    return res.status(200).send(manutencao);
  }
}

export { FindManutencaoController };