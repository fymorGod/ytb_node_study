import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { UpdateAntenaService } from "../../services/antenas/UpdateAntenaService";


class UpdateAntenaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo,marca,modelo, categoria,status,gain,tipos_antena,posicao_torre,vr,tipo_equipamento,station_id } = req.body;

    const prismaAntenaRepository = new PrismaAntenaRepository()

    const updateAntenaService = new UpdateAntenaService(prismaAntenaRepository);

    const antena = await updateAntenaService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      gain,
      posicao_torre,
      station_id,
      tipo_equipamento,
      tipos_antena,
      vr
    });

    if(antena instanceof Error) {
      return res.status(400).json({ error: antena.message });
    }

    return res.status(200).json({
      message: "Antena atualizada com sucesso!",
    });
  }
}

export { UpdateAntenaController };