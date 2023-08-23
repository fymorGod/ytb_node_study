import { Request, Response } from "express";
import { PrismaTelemetriaRepository } from "../../repositories/prisma/prisma-telemetria-repository";
import { GetTelemetriaService } from "../../services/telemetria/GetTelemetriaService";

class GetTelemetriaController {
  async handle(req: Request, res: Response) {

    const prismaTelemetriaRepository = new PrismaTelemetriaRepository();

    const getTelemetriaService = new GetTelemetriaService(prismaTelemetriaRepository);

    const telemetria = await getTelemetriaService.execute();

    if(telemetria instanceof Error) {
      return res.status(400).send(telemetria.message)
    }

    return res.status(200).send(telemetria);
  }
}

export { GetTelemetriaController };