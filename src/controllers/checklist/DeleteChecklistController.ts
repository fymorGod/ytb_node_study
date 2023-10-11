import { Request, Response } from "express";
import { PrismaChecklistRepository } from "../../repositories/prisma/prisma-checklist-repository";
import { DeleteChecklistService } from "../../services/checklist/DeleteChecklistService";

class DeleteChecklistController {

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prismaChecklistRepository = new PrismaChecklistRepository();

    const deleteChecklistService = new DeleteChecklistService(prismaChecklistRepository);

    const checklist = await deleteChecklistService.execute({
      id,
    })

    if(checklist instanceof Error) {
      return res.status(400).json({ error: checklist.message });
    }

    return res.status(204).json({
      message: "Ativo deletado com sucesso!"
    });
  }
}

export { DeleteChecklistController };