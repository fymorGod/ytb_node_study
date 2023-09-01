import { Request, Response } from "express";
import { PrismaStationRepository } from "../../repositories/prisma/prisma-station-repository";
import { GetStationService } from "../../services/station/GetStationService";

class GetStationController {
  async handle(req: Request, res: Response) {

    const prismaStationRepository = new PrismaStationRepository();

    const getStationsService = new GetStationService(prismaStationRepository);

    const station = await getStationsService.execute();

    if(station instanceof Error) {
      return res.status(400).send(station.message)
    }

    return res.status(200).send(station);
  }
}

export { GetStationController };