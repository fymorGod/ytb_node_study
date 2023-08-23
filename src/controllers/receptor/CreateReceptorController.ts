import { Request, Response } from "express";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";
import { CreateReceptorService } from "../../services/receptor/CreateReceptorService";


class CreateReceptorControler {
  
  async handle(req: Request, res: Response) {
    const {  codigo, marca, modelo, categoria, status, frequencia, symbol_rate, tipo_equipamento, parabolica, station_id } = req.body;

    const prismaReceptorRepository = new PrismaReceptorRepository();

    // Service
    const createReceptorService = new CreateReceptorService(prismaReceptorRepository);

    //executando o service
    const receptor = await createReceptorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         frequencia,
         symbol_rate,
         tipo_equipamento,
         parabolica,
         station_id
    })
    
    if(receptor instanceof Error) {
      return res.status(400).send(receptor.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Receptor criado com sucesso!",
        receptor
      }
    );
  }
}

export { CreateReceptorControler };