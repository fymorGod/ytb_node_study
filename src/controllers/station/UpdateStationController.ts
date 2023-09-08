import { Request, Response } from "express";
import { PrismaStationRepository } from "../../repositories/prisma/prisma-station-repository";
import { UpdateStationService } from "../../services/station/UpdateStationService";

class UpdateStationController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { name, address, latitude, link_grafana, longitude, status } = req.body;

    const prismaStationRepository = new PrismaStationRepository()

    const updateStationService = new UpdateStationService(prismaStationRepository);

    const station = await updateStationService.execute({
      id,
      name,
      address,
      latitude,
      link_grafana,
      longitude,
      status
    });

    if(station instanceof Error) {
      return res.status(400).json({ error: station.message });
    }

    return res.status(200).json({
      message: "Station atualizada com sucesso!",
    });
  }
}

export { UpdateStationController };