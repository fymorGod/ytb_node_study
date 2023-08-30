import { Request, Response } from "express";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { DeleteTransmissorService } from "../../services/transmissor/DeleteTransmissorService";


class DeleteTransmissorController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaTransmissorRepository = new PrismaTransmissorRepository();

    const deleteTransmissorService = new DeleteTransmissorService(prismaTransmissorRepository);

    const transmissor = await deleteTransmissorService.execute({
      id,
    })

    if(transmissor instanceof Error) {
      return res.status(400).json({ error: transmissor.message });
    }

    return res.status(204).end();
  }
}

export { DeleteTransmissorController };