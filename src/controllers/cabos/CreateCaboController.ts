import { Request, Response } from "express";
import { PrismaCaboRepository } from "../../repositories/prisma/prisma-cabo-repository";
import { CreateCaboService } from "../../services/cabos/CreateCaboService";

class CreateCaboController {
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, tipo_equipamento, station_id } = req.body;

    const prismaCaboRepository = new PrismaCaboRepository()

    //service
    const createCaboService = new CreateCaboService(prismaCaboRepository);

    const cabo = await createCaboService.execute({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipos_cabo,
      tamanho,
      tipo_equipamento,
      station_id
    });

    if(cabo instanceof Error) {
      return res.status(400).json({ error: cabo.message });
    }

    return res.status(201).json({
      message: 'Cabo criado com sucesso',
      cabo
    });
  }
}
export { CreateCaboController }