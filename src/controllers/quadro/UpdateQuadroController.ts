import { Request, Response } from "express";
import { PrismaQuadroRepository } from "../../repositories/prisma/prisma-quadro-repository";
import { UpdateQuadroService } from "../../services/quadro/UpdateQuadroService";

class UpdateQuadroController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id } = req.body;

    const prismaQuadroRepository = new PrismaQuadroRepository()

    const updateQuadroService = new UpdateQuadroService(prismaQuadroRepository);

    const quadro = await updateQuadroService.execute({
      id,
      codigo,
      categoria,
      status,
      dps,
      disjuntor,
      station_id,
      tipo_equipamento,
    });

    if(quadro instanceof Error) {
      return res.status(400).json({ error: quadro.message });
    }

    return res.status(200).json({
      message: "Quadro atualizado com sucesso!",
    });
  }
}

export { UpdateQuadroController };