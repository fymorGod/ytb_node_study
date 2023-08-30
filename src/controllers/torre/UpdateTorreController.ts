import { Request, Response } from "express";
import { PrismaTorreRepository } from "../../repositories/prisma/prisma-torre-repository";
import { UpdateTorreService } from "../../services/torre/UpdateTorreService";

class UpdateTorreController {

  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca,modelo, categoria, status, tipo_torre, aterramento, altura, tipo_equipamento, station_id } = req.body;

    const prismaTorreRepository = new PrismaTorreRepository()

    const updateTorreService = new UpdateTorreService(prismaTorreRepository);

    const torre = await updateTorreService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      tipo_torre,
      aterramento,
      altura,
      tipo_equipamento,
      station_id
    });

    if(torre instanceof Error) {
      return res.status(400).json({ error: torre.message });
    }

    return res.status(200).json({
      message: "Torre atualizada com sucesso!",
    });
  }
}

export { UpdateTorreController };