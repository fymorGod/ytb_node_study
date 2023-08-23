import { Request, Response } from "express";
import { PrismaNobreakRepository } from "../../repositories/prisma/prisma-nobreak-repository";
import { CreateNobreakService } from "../../services/nobreak/CreateNobreakService";


class CreateNobreakControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, tipo_equipamento, station_id  } = req.body;

    const prismaNobreakRepository = new PrismaNobreakRepository();

    // Service
    const createNobreakService = new CreateNobreakService(prismaNobreakRepository);

    //executando o service
    const nobreak = await createNobreakService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tensao_entrada,
         tensao_saida,
         tipo_equipamento,
         station_id
    })
    
    if(nobreak instanceof Error) {
      return res.status(400).send(nobreak.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Nobreak criada com sucesso!",
        nobreak
      }
    );
  }
}

export { CreateNobreakControler };