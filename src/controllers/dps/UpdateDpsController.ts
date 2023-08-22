import { Request, Response } from "express";
import { PrismaDpsRepository } from "../../repositories/prisma/prisma-dps-repository";
import { UpdateDpsService } from "../../services/dps/UpdateDpsService";

class UpdateDpsController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const {codigo, marca, modelo, categoria, status, corrente_maxima, classe_dps, tipo_equipamento, station_id  } = req.body;

    const prismaDpsRepository = new PrismaDpsRepository()

    const updateDpsService = new UpdateDpsService(prismaDpsRepository);

    const dps = await updateDpsService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      corrente_maxima,
      classe_dps,
      tipo_equipamento,
      station_id
    });

    if(dps instanceof Error) {
      return res.status(400).json({ error: dps.message });
    }

    return res.status(200).json({
      message: "Dps atualizada com sucesso!",
    });
  }
}

export { UpdateDpsController };