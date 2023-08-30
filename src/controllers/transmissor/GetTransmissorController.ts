import { Request, Response } from "express";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { GetTransmissorService } from "../../services/transmissor/GetTransmissorService";


class GetTransmissorController {
  async handle(req: Request, res: Response) {

    const prismaTransmissorRepository = new PrismaTransmissorRepository();

    const getTransmissorsService = new GetTransmissorService(prismaTransmissorRepository);

    const transmissor = await getTransmissorsService.execute();

    if(transmissor instanceof Error) {
      return res.status(400).send(transmissor.message)
    }

    return res.status(200).send(transmissor);
  }
}

export { GetTransmissorController };