import { Request, Response } from "express";
import { PrismaDisjuntorRepository } from "../../repositories/prisma/prisma-disjuntor-repository";
import { CreateDisjuntorService } from "../../services/disjuntor/CreateDisjuntorService";


class CreateDisjuntorControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, corrente_maxima, tipo_equipamento, station_id } = req.body;

    const prismaDisjuntorRepository = new PrismaDisjuntorRepository();

    // Service
    const createDisjuntorService = new CreateDisjuntorService(prismaDisjuntorRepository);

    //executando o service
    const disjuntores = await createDisjuntorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status, 
         corrente_maxima, 
         tipo_equipamento,
         station_id
    })
    
    if(disjuntores instanceof Error) {
      return res.status(400).send(disjuntores.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Disjuntor criado com sucesso!",
        disjuntores
      }
    );
  }
}

export { CreateDisjuntorControler };