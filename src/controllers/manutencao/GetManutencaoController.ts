import { Request, Response } from "express";
import { PrismaChecklistRepository } from "../../repositories/prisma/prisma-checklist-repository";
import { GetChecklistService } from "../../services/checklist/GetChecklistService";
import { PrismaManutencaoRepository } from "../../repositories/prisma/prisma-manutencao-repository";
import { GetManutencaoService } from "../../services/manutencao/GetManutencaoService";

class GetManutencaoController {
  async handle(req: Request, res: Response) {

    const prismaManutencaoRepository = new PrismaManutencaoRepository();

    const getManutencaosService = new GetManutencaoService(prismaManutencaoRepository);

    const manutencao = await getManutencaosService.execute();

    if(manutencao instanceof Error) {
      return res.status(400).send(manutencao.message)
    }

    return res.status(200).send(manutencao);
  }
}

export { GetManutencaoController };