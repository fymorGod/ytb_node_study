import { Request, Response } from "express";
import { PrismaTorreRepository } from "../../repositories/prisma/prisma-torre-repository";
import { CreateTorreService } from "../../services/torre/CreateTorreService";


class CreateTorreControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tipo_torre, aterramento , altura, tipo_equipamento, station_id } = req.body;

    const prismaTorreRepository = new PrismaTorreRepository();

    // Service
    const createTorreService = new CreateTorreService(prismaTorreRepository);

    //executando o service
    const torre = await createTorreService.execute({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipo_torre,
      aterramento,
      altura,
      tipo_equipamento,
      station_id
    })
    
    if(torre instanceof Error) {
      return res.status(400).send(torre.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Torre criada com sucesso!",
        torre
      }
    );
  }
}

export { CreateTorreControler };