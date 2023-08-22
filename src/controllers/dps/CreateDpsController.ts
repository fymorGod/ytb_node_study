import { Request, Response } from "express";
import { PrismaDpsRepository } from "../../repositories/prisma/prisma-dps-repository";
import { CreateDpsService } from "../../services/dps/CreateDpsService";

class CreateDpsControler {
  
  async handle(req: Request, res: Response) {
    const {  codigo, marca, modelo, categoria, status, corrente_maxima, classe_dps, tipo_equipamento, station_id } = req.body;

    const prismaDpsRepository = new PrismaDpsRepository();

    // Service
    const createDpsService = new CreateDpsService(prismaDpsRepository);

    //executando o service
    const dps = await createDpsService.execute({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        corrente_maxima,
        classe_dps,
        tipo_equipamento,
        station_id
    })
    
    if(dps instanceof Error) {
      return res.status(400).send(dps.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Dps criada com sucesso!",
        dps
      }
    );
  }
}

export { CreateDpsControler };