import { Request, Response } from "express";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { FindTransmissorService } from "../../services/transmissor/FindTransmissorService";

class FindTransmissorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const prismaTransmissorRepository = new PrismaTransmissorRepository();

    const findTransmissorService = new FindTransmissorService(prismaTransmissorRepository);

    const transmissor = await findTransmissorService.execute({ id });

    if(transmissor instanceof Error) {
      return res.status(400).json({ error: transmissor.message });
    }

    return res.status(200).send(transmissor);
  }
}

export { FindTransmissorController };