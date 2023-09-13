import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { GetAntenaService } from "../../services/antenas/GetAntenaService";

class GetAntenaController {
  async handle(req: Request, res: Response) {

    const prismaAntenaRepository = new PrismaAntenaRepository();

    const getAntenasService = new GetAntenaService(prismaAntenaRepository);

    const antenas = await getAntenasService.execute();

    if(antenas instanceof Error) {
      return res.status(400).send(antenas.message)
    }

    return res.status(200).send(antenas);
  }
}

export { GetAntenaController };