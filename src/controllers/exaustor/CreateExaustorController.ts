import { Request, Response } from "express";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { CreateExaustorService } from "../../services/exaustor/CreateExaustorService";

class CreateExaustorControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tipo_equipamento, station_id } = req.body;

    const prismaExaustorRepository = new PrismaExaustorRepository();

    // Service
    const createExaustorService = new CreateExaustorService(prismaExaustorRepository);

    //executando o service
    const exaustor = await createExaustorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tipo_equipamento,
         station_id
    })
    
    if(exaustor instanceof Error) {
      return res.status(400).send(exaustor.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Combinador criado com sucesso!",
        exaustor
      }
    );
  }
}

export { CreateExaustorControler };