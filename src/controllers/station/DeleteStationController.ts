import { Request, Response } from "express";
import { PrismaStationRepository } from "../../repositories/prisma/prisma-station-repository";
import { DeleteStationService } from "../../services/station/DeleteStationService";

class DeleteStationController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaStationRepository = new PrismaStationRepository();

    const deleteStationService = new DeleteStationService(prismaStationRepository);

    const station = await deleteStationService.execute({
      id,
    })

    if(station instanceof Error) {
      return res.status(400).json({ error: station.message });
    }

    return res.status(204).end();
  }
}

export { DeleteStationController };