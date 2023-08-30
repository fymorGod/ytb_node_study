import { Request, Response } from "express";
import { PrismaSwitchRepository } from "../../repositories/prisma/prisma-switch-repository";
import { CreateSwitchService } from "../../services/switchies/CreateSwitchService";


class CreateSwitchControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, qtd_portas, tipo_equipamento, station_id } = req.body;

    const prismaSwitchRepository = new PrismaSwitchRepository();

    // Service
    const createSwitchService = new CreateSwitchService(prismaSwitchRepository);

    //executando o service
    const switchies = await createSwitchService.execute({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        qtd_portas,
        tipo_equipamento,
        station_id
    })
    
    if(switchies instanceof Error) {
      return res.status(400).send(switchies.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Switch criado com sucesso!",
        switchies
      }
    );
  }
}

export { CreateSwitchControler };