import { Request, Response } from "express";
import { PrismaCombinadorRepository } from "../../repositories/prisma/prisma-combinador-repository";
import { UpdateCombinadorService } from "../../services/combinador/UpdateCombinadorService";


class UpdateCombinadorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo,marca,modelo, categoria,status,gain,tipos_Combinador,posicao_torre,vr,tipo_equipamento,station_id } = req.body;

    const prismaCombinadorRepository = new PrismaCombinadorRepository()

    const updateCombinadorService = new UpdateCombinadorService(prismaCombinadorRepository);

    const combinador = await updateCombinadorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      station_id,
      tipo_equipamento,
    });

    if(combinador instanceof Error) {
      return res.status(400).json({ error: combinador.message });
    }

    return res.status(200).json({
      message: "combinador atualizado com sucesso!",
    });
  }
}

export { UpdateCombinadorController };