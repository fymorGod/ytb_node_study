import { Request, Response } from "express";
import { PrismaParabolicaRepository } from "../../repositories/prisma/prisma-parabolica-repository";
import { UpdateParabolicaService } from "../../services/parabolica/UpdateParabolicaService";


class UpdateParabolicaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, diametro, satelite, tipo_equipamento, station_id } = req.body;

    const prismaParabolicaRepository = new PrismaParabolicaRepository()

    const updateParabolicaService = new UpdateParabolicaService(prismaParabolicaRepository);

    const parabolica = await updateParabolicaService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      diametro,
      satelite,
      station_id,
      tipo_equipamento
    });

    if(parabolica instanceof Error) {
      return res.status(400).json({ error: parabolica.message });
    }

    return res.status(200).json({
      message: "Parabolica atualizada com sucesso!",
    });
  }
}

export { UpdateParabolicaController };