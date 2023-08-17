import { Request, Response } from "express";
import { PrismaCombinadorRepository } from "../../repositories/prisma/prisma-combinador-repository";
import { CreateCombinadorService } from "../../services/combinador/CreateCombinadorService";


class CreateCombinadorControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, gain, tipos_Combinador, posicao_torre, vr, tipo_equipamento, station_id } = req.body;

    const prismaCombinadorRepository = new PrismaCombinadorRepository();

    // Service
    const createCombinadorService = new CreateCombinadorService(prismaCombinadorRepository);

    //executando o service
    const combinador = await createCombinadorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tipo_equipamento,
         station_id
    })
    
    if(combinador instanceof Error) {
      return res.status(400).send(combinador.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Combinador criado com sucesso!",
        combinador
      }
    );
  }
}

export { CreateCombinadorControler };