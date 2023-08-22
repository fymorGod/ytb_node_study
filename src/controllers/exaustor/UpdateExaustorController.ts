import { Request, Response } from "express";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { UpdateExaustorService } from "../../services/exaustor/UpdateExaustorService";

class UpdateExaustorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo,marca,modelo, categoria,status,tipo_equipamento,station_id } = req.body;

    const prismaExaustorRepository = new PrismaExaustorRepository()

    const updateExaustorService = new UpdateExaustorService(prismaExaustorRepository);

    const exaustor = await updateExaustorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      station_id,
      tipo_equipamento,
    });

    if(exaustor instanceof Error) {
      return res.status(400).json({ error: exaustor.message });
    }

    return res.status(200).json({
      message: "exaustor atualizado com sucesso!",
    });
  }
}

export { UpdateExaustorController };