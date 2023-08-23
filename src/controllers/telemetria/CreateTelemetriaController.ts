import { Request, Response } from "express";
import { PrismaTelemetriaRepository } from "../../repositories/prisma/prisma-telemetria-repository";
import { CreateTelemetriaService } from "../../services/telemetria/CreateTelemetriaService";

class CreateTelemetriaControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tipo_equipamento, station_id } = req.body;

    const prismaTelemetriaRepository = new PrismaTelemetriaRepository();

    // Service
    const createTelemetriaService = new CreateTelemetriaService(prismaTelemetriaRepository);

    //executando o service
    const telemetria = await createTelemetriaService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tipo_equipamento,
         station_id
    })
    
    if(telemetria instanceof Error) {
      return res.status(400).send(telemetria.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Telemetria criado com sucesso!",
        telemetria
      }
    );
  }
}

export { CreateTelemetriaControler };