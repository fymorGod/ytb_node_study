import { Request, Response } from "express";
import { PrismaArcondicionadoRepository } from "../../repositories/prisma/prisma-arcondicionados-repository";
import { CreateArcondicionadoService } from "../../services/arcondicionados/CreateArcondicionadoService";


class CreateArcondicionadoController {
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, potencia, tensao, tipo_equipamento, station_id } = req.body;

    const prismaArcondicionadoRepository = new PrismaArcondicionadoRepository();
    const createArcondicionado = new CreateArcondicionadoService(prismaArcondicionadoRepository);

    const arcondicionado = await createArcondicionado.execute({
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

    if(arcondicionado instanceof Error) {
      return res.status(400).json({ error: arcondicionado.message });
    }

    return res.status(201).json({
      message: "Arcondicionado criado com sucesso!",
      arcondicionado
    });
  }
}

export { CreateArcondicionadoController };