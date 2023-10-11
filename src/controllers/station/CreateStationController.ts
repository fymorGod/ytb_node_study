import { Request, Response } from "express";
import { PrismaStationRepository } from "../../repositories/prisma/prisma-station-repository";
import { CreateStationService } from "../../services/station/CreateStationService";

class CreateStationControler {
  
  async handle(req: Request, res: Response) {
    const { name, address, latitude, link_grafana, longitude, status, manutencaoId } = req.body;

    const prismaStationRepository = new PrismaStationRepository();

    // Service
    const createStationService = new CreateStationService(prismaStationRepository);

    //executando o service
    const station = await createStationService.execute({
      name,
      address,
      latitude,
      link_grafana,
      longitude,
      status,
      manutencaoId
    })
    
    if(station instanceof Error) {
      return res.status(400).send(station.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Station criada com sucesso!",
        station
      }
    );
  }
}

export { CreateStationControler };