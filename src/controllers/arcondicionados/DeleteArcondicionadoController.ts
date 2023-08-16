import { Request, Response } from "express";
import { PrismaArcondicionadoRepository } from "../../repositories/prisma/prisma-arcondicionados-repository";
import { DeleteArcondicionadoService } from "../../services/arcondicionados/DeleteArcondicionadoService";


class DeleteArcondicionadoController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaArcondicionadoRepository = new PrismaArcondicionadoRepository();

    const deleteArcondicionadoService = new DeleteArcondicionadoService(prismaArcondicionadoRepository);

    const arcondicionado = await deleteArcondicionadoService.execute({
      id,
    });

    if(arcondicionado instanceof Error) {
      return res.status(400).json({ error: arcondicionado.message });
    }

    return res.status(204).end();
  }
}

export { DeleteArcondicionadoController };