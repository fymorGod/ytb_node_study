import { Request, Response } from "express";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { CreateTransmissorService } from "../../services/transmissor/CreateTransmissorService";


class CreateTransmissorControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, receptor, antena, tipo_equipamento, station_id  } = req.body;

    const prismaTransmissorRepository = new PrismaTransmissorRepository();

    // Service
    const createTransmissorService = new CreateTransmissorService(prismaTransmissorRepository);

    //executando o service
    const transmissor = await createTransmissorService.execute({
        codigo,
        marca,
        modelo,
        categoria,
        status,
        programmed,
        canal_fisico,
        canal_virtual,
        acoplador_one,
        acoplador_two,
        receptor,
        antena,
        tipo_equipamento,
        station_id
    })
    
    if(transmissor instanceof Error) {
      return res.status(400).send(transmissor.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Transmissor criado com sucesso!",
        transmissor
      }
    );
  }
}

export { CreateTransmissorControler };