import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { CreateAntenaService } from "../../services/antenas/CreateAntenaService";


class CreateAntenaControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, posicao_torre, vr, tipo_equipamento, station_id } = req.body;

    const prismaAntenaRepository = new PrismaAntenaRepository();

    // Service
    const createAntenaService = new CreateAntenaService(prismaAntenaRepository);

    //executando o service
    const antena = await createAntenaService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         gain,
         tipos_antena,
         posicao_torre,
         vr,
         tipo_equipamento,
         station_id
    })
    
    if(antena instanceof Error) {
      return res.status(400).send(antena.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Antena criada com sucesso!",
        antena
      }
    );
  }
}

export { CreateAntenaControler };