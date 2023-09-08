import { Request, Response } from "express";
import { PrismaQuadroRepository } from "../../repositories/prisma/prisma-quadro-repository";
import { CreateQuadroService } from "../../services/quadro/CreateQuadroService";

class CreateQuadroControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, categoria, status, dps, disjuntor, tipo_equipamento, station_id } = req.body;

    const prismaQuadroRepository = new PrismaQuadroRepository();

    // Service
    const createQuadroService = new CreateQuadroService(prismaQuadroRepository);

    //executando o service
    const quadro = await createQuadroService.execute({
         codigo,
         categoria,
         status,
         dps,
         disjuntor,
         tipo_equipamento,
         station_id
    })
    
    if(quadro instanceof Error) {
      return res.status(400).send(quadro.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Quadro criado com sucesso!",
        quadro
      }
    );
  }
}

export { CreateQuadroControler };