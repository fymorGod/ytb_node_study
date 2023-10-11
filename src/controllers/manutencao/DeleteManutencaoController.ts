import { Request, Response } from "express";
import { PrismaManutencaoRepository } from "../../repositories/prisma/prisma-manutencao-repository";
import { DeleteManutencaoService } from "../../services/manutencao/DeleteManutencaoService";

class DeleteManutencaoController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaManutencaoRepository = new PrismaManutencaoRepository();

    const deleteManutencaoService = new DeleteManutencaoService(prismaManutencaoRepository);

    const manutencao = await deleteManutencaoService.execute({
      id,
    })

    if(manutencao instanceof Error) {
      return res.status(400).json({ error: manutencao.message });
    }

    return res.status(204).json({
      message: "Ativo deletado com sucesso!"
    });
  }
}

export { DeleteManutencaoController };