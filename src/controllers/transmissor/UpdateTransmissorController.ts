import { Request, Response } from "express";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { UpdateTransmissorService } from "../../services/transmissor/UpdateTransmissorService";

class UpdateTransmissorController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, receptor, antena, tipo_equipamento, station_id } = req.body;
  
    const prismaTransmissorRepository = new PrismaTransmissorRepository();

    // Service
    const createTransmissorService = new UpdateTransmissorService(prismaTransmissorRepository);

    const transmissor = await createTransmissorService.execute({
      id,
      codigo,
      marca,
      modelo,
      categoria,
      status,
      programmed,
      canal_fisico,
      canal_virtual,
      acoplador_one,
      acoplador_two,
      receptor,
      antena,
      tipo_equipamento,
      station_id,
    });

    if(transmissor instanceof Error) {
      return res.status(400).json({ error: transmissor.message });
    }

    return res.status(200).json({
      message: "Transmissor atualizado com sucesso!",
    });
  }
}

export { UpdateTransmissorController };