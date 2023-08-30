import { Request, Response } from "express";
import { PrismaSwitchRepository } from "../../repositories/prisma/prisma-switch-repository";
import { UpdateSwitchService } from "../../services/switchies/UpdateSwitchService";

class UpdateSwitchController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, qtd_portas, tipo_equipamento, station_id } = req.body;

    const prismaSwitchRepository = new PrismaSwitchRepository()

    const updateSwitchService = new UpdateSwitchService(prismaSwitchRepository);

    const switchies = await updateSwitchService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      qtd_portas,
      station_id,
      tipo_equipamento,
    });

    if(switchies instanceof Error) {
      return res.status(400).json({ error: switchies.message });
    }

    return res.status(200).json({
      message: "Switch atualizado com sucesso!",
    });
  }
}

export { UpdateSwitchController };