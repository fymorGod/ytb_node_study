import { Request, Response } from "express";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";
import { CreateReceptorService } from "../../services/receptor/CreateReceptorService";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { FindTransmissorController } from "../transmissor/FindTransmissorController";


class CreateReceptorControler {
  
  async handle(req: Request, res: Response) {
    const {  codigo, marca, modelo, categoria, status, frequencia, symbol_rate, channel,tipo_equipamento, parabolica, station_id, transmisssor } = req.body;

    const prismaReceptorRepository = new PrismaReceptorRepository();
    // const prismaTransmissorRepository = new PrismaTransmissorRepository();
    // Service
    const createReceptorService = new CreateReceptorService(prismaReceptorRepository);

    // const getTransmissorByID = prismaTransmissorRepository.find(transmisssor)

    //executando o service
    const receptor = await createReceptorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         frequencia,
         symbol_rate,
         channel,
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