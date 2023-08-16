import { Request, Response } from "express";
import { PrismaArcondicionadoRepository } from "../../repositories/prisma/prisma-arcondicionados-repository";
import { UpdateArcondicionadoService } from "../../services/arcondicionados/UpdateArcondicionadoService";

class UpdateArcondicionadoController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, potencia, tensao,tipo_equipamento,station_id } = req.body;

    const prismaArcondicionadoRepository = new PrismaArcondicionadoRepository();

    const updateArcondicionadoService = new UpdateArcondicionadoService(prismaArcondicionadoRepository);

    const arcondicionado = await updateArcondicionadoService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      potencia,
      tensao,
      tipo_equipamento,
      station_id
    });

    if( arcondicionado instanceof Error) {
      return res.status(400).json({ error: arcondicionado.message });
    }

    return res.status(200).json(
      {
        message: 'Arcondicionado atualizado com sucesso!',
        arcondicionado
      }
    )
  }
}

export { UpdateArcondicionadoController };