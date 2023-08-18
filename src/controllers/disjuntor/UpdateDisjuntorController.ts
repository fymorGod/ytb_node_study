import { Request, Response } from "express";
import { PrismaDisjuntorRepository } from "../../repositories/prisma/prisma-disjuntor-repository";
import { UpdateDisjuntorService } from "../../services/disjuntor/UpdateDisjuntorService";


class UpdateDisjuntorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo,marca,modelo, categoria,status, corrente_maxima,tipo_equipamento,station_id } = req.body;

    const prismaDisjuntorRepository = new PrismaDisjuntorRepository()

    const updateDisjuntorService = new UpdateDisjuntorService(prismaDisjuntorRepository);

    const disjuntores = await updateDisjuntorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      corrente_maxima,
      station_id,
      tipo_equipamento
    });

    if(disjuntores instanceof Error) {
      return res.status(400).json({ error: disjuntores.message });
    }

    return res.status(200).json({
      message: "Disjuntores atualizada com sucesso!",
    });
  }
}

export { UpdateDisjuntorController };