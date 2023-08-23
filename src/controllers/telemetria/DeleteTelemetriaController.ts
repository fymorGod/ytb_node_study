import { Request, Response } from "express";
import { PrismaTelemetriaRepository } from "../../repositories/prisma/prisma-telemetria-repository";
import { DeleteTelemetriaService } from "../../services/telemetria/DeleteTelemetriaService";

class DeleteTelemetriaController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaTelemetriaRepository = new PrismaTelemetriaRepository();

    const deleteTelemetriaService = new DeleteTelemetriaService(prismaTelemetriaRepository);

    const telemetria = await deleteTelemetriaService.execute({
      id,
    })

    if(telemetria instanceof Error) {
      return res.status(400).json({ error: telemetria.message });
    }

    return res.status(204).end();
  }
}

export { DeleteTelemetriaController };