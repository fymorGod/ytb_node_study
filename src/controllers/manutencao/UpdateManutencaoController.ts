import { Request, Response } from "express";
import { PrismaManutencaoRepository } from "../../repositories/prisma/prisma-manutencao-repository";
import { UpdateManutencaoService } from "../../services/manutencao/UpdateManutencaoService";

class UpdateManutencaoController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { tipo, checklist, observacao, stationId, status, userId } = req.body;

    const prismaManutencaoRepository = new PrismaManutencaoRepository()

    const updateManutencaoService = new UpdateManutencaoService(prismaManutencaoRepository);

    const manutencao = await updateManutencaoService.execute({
      id,
      checklist,
      observacao,
      stationId,
      status,
      tipo,
      userId
    });

    if(manutencao instanceof Error) {
      return res.status(400).json({ error: manutencao.message });
    }

    return res.status(200).json({
      message: "Manutencão atualizada com sucesso!",
    });
  }
}

export { UpdateManutencaoController };