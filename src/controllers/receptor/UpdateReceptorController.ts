import { Request, Response } from "express";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";
import { UpdateReceptorService } from "../../services/receptor/UpdateReceptorService";

class UpdateReceptorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, frequencia, symbol_rate, tipo_equipamento, parabolica, station_id } = req.body;

    const prismaReceptorRepository = new PrismaReceptorRepository()

    const updateReceptorService = new UpdateReceptorService(prismaReceptorRepository);

    const receptor = await updateReceptorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      frequencia,
      symbol_rate,
      tipo_equipamento,
      parabolica,
      station_id,
    });

    if(receptor instanceof Error) {
      return res.status(400).json({ error: receptor.message });
    }

    return res.status(200).json({
      message: "Receptor atualizado com sucesso!",
    });
  }
}

export { UpdateReceptorController };