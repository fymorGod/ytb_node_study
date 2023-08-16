import { Request, Response } from "express";
import { PrismaArcondicionadoRepository } from "../../repositories/prisma/prisma-arcondicionados-repository";
import { GetArcondicionadoService } from "../../services/arcondicionados/GetArcondicionadoService";


class GetArcondicionadoController {
  async handle(req: Request, res: Response) {
    const prismaArcondicionadoRepository = new PrismaArcondicionadoRepository();
    const getArcondicionadoService = new GetArcondicionadoService(prismaArcondicionadoRepository);

    const arcondicionado = await getArcondicionadoService.execute();

    if(arcondicionado instanceof Error) {
      return res.status(400).json({ error: arcondicionado.message });
    }

    return res.status(200).send(arcondicionado);
  }
}

export { GetArcondicionadoController };
