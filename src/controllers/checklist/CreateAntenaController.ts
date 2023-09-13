import { Request, Response } from "express";
import { PrismaChecklistRepository } from "../../repositories/prisma/prisma-checklist-repository";
import { CreateChecklistService } from "../../services/checklist/CreateChecklistService";

class CreateChecklistControler {
  
  async handle(req: Request, res: Response) {
    const { name, tarefas, tipo_equipamento } = req.body;

    const prismaChecklistRepository = new PrismaChecklistRepository();

    // Service
    const createChecklistService = new CreateChecklistService(prismaChecklistRepository);

    //executando o service
    const checklist = await createChecklistService.execute({
         name,
         tarefas,
         tipo_equipamento
    })
    
    if(checklist instanceof Error) {
      return res.status(400).send(checklist.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Checklist criado com sucesso!",
        checklist
      }
    );
  }
}

export { CreateChecklistControler };