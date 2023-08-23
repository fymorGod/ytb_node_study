import { Request, Response } from "express";
import { PrismaTelemetriaRepository } from "../../repositories/prisma/prisma-telemetria-repository";
import { UpdateTelemetriaService } from "../../services/telemetria/UpdateTelemetriaService";

class UpdateTelemetriaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo,marca,modelo, categoria,status,tipo_equipamento,station_id } = req.body;

    const prismaTelemetriaRepository = new PrismaTelemetriaRepository()

    const updateTelemetriaService = new UpdateTelemetriaService(prismaTelemetriaRepository);

    const telemetria = await updateTelemetriaService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      station_id,
      tipo_equipamento,
    });

    if(telemetria instanceof Error) {
      return res.status(400).json({ error: telemetria.message });
    }

    return res.status(200).json({
      message: "Telemetria atualizado com sucesso!",
    });
  }
}

export { UpdateTelemetriaController };