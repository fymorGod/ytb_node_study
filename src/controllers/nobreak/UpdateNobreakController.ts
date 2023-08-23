import { Request, Response } from "express";
import { PrismaNobreakRepository } from "../../repositories/prisma/prisma-nobreak-repository";
import { UpdateNobreakService } from "../../services/nobreak/UpdateNobreakService";

class UpdateNobreakController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento, station_id} = req.body;

    const prismaNobreakRepository = new PrismaNobreakRepository()

    const updateNobreakService = new UpdateNobreakService(prismaNobreakRepository);

    const nobreak = await updateNobreakService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tensao_entrada,
      tensao_saida,
      station_id,
      tipo_equipamento,
    });

    if(nobreak instanceof Error) {
      return res.status(400).json({ error: nobreak.message });
    }

    return res.status(200).json({
      message: "Nobreak atualizada com sucesso!",
    });
  }
}

export { UpdateNobreakController };