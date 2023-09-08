import { Request, Response } from "express";
import { PrismaStationRepository } from "../../repositories/prisma/prisma-station-repository";
import { FindStationService } from "../../services/station/FindStationService";

class FindStationController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaStationRepository = new PrismaStationRepository();

    const findStationService = new FindStationService(prismaStationRepository);

    const station = await findStationService.execute({ id });

    if(station instanceof Error) {
      return res.status(400).json({ error: station.message });
    }

    return res.status(200).send(station);
  }
}

export { FindStationController };