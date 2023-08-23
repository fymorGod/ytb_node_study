import { Request, Response } from "express";
import { PrismaTelemetriaRepository } from "../../repositories/prisma/prisma-telemetria-repository";
import { FindTelemetriaService } from "../../services/telemetria/FindTelemetriaService";

class FindTelemetriaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaTelemetriaRepository = new PrismaTelemetriaRepository();

    const findTelemetriaService = new FindTelemetriaService(prismaTelemetriaRepository);

    const telemetria = await findTelemetriaService.execute({ id });

    if(telemetria instanceof Error) {
      return res.status(400).json({ error: telemetria.message });
    }

    return res.status(200).send(telemetria);
  }
}

export { FindTelemetriaController };