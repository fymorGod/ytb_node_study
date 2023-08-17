import { Request, Response } from "express";
import { PrismaCaboRepository } from "../../repositories/prisma/prisma-cabo-repository";
import { UpdateCaboService } from "../../services/cabos/UpdateCaboService";

class UpdateCaboController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, tipo_equipamento, station_id } = req.body;

    const prismaCaboRepository = new PrismaCaboRepository()

    const updateCaboService = new UpdateCaboService(prismaCaboRepository)

    const cabo = await updateCaboService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipos_cabo,
      tamanho,
      tipo_equipamento,
      station_id
    })
    if (cabo instanceof Error) {
      return res.status(400).json({ error: cabo.message })
    }

    return res.status(200).json({
      message: "Cabo atualizado com sucesso",
      cabo
    });
  }
}

export { UpdateCaboController };