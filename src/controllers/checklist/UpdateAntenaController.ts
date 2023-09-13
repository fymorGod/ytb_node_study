import { Request, Response } from "express";
import { PrismaChecklistRepository } from "../../repositories/prisma/prisma-checklist-repository";
import { UpdateChecklistService } from "../../services/checklist/UpdateChecklistService";

class UpdateChecklistController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { name, tarefas, tipo_equipamento} = req.body;

    const prismaChecklistRepository = new PrismaChecklistRepository()

    const updateChecklistService = new UpdateChecklistService(prismaChecklistRepository);

    const checklist = await updateChecklistService.execute({
      id,
      name,
      tarefas,
      tipo_equipamento
    });

    if(checklist instanceof Error) {
      return res.status(400).json({ error: checklist.message });
    }

    return res.status(200).json({
      message: "Checklist atualizado com sucesso!",
    });
  }
}

export { UpdateChecklistController };