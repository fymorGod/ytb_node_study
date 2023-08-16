import { Request, Response } from "express";
import { PrismaArcondicionadoRepository } from "../../repositories/prisma/prisma-arcondicionados-repository";
import { FindArcondicionadoService } from "../../services/arcondicionados/FindArcondicionadoService";

class FindArcondicionadoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaArconcidionadoRepository = new PrismaArcondicionadoRepository();

    const findArcondicionadoService = new FindArcondicionadoService(prismaArconcidionadoRepository);

    const arcondicionado = await findArcondicionadoService.execute({ id });

    if(arcondicionado instanceof Error) {
      return res.status(400).json({ error: arcondicionado.message });
    }

      return res.status(200).send(arcondicionado);
  }
}

export { FindArcondicionadoController };