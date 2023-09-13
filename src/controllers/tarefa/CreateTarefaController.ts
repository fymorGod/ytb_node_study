import { Request, Response } from "express";
import { PrismaTarefaRepository } from "../../repositories/prisma/prisma-tarefa-repository";
import { CreateTarefaService } from "../../services/tarefa/CreateTarefaService";


class CreateTarefaControler {
  
  async handle(req: Request, res: Response) {
    const { description, verificado, foto_verificado } = req.body;

    const prismaTarefaRepository = new PrismaTarefaRepository();

    // Service
    const createTarefaService = new CreateTarefaService(prismaTarefaRepository);

    //executando o service
    const tarefa = await createTarefaService.execute({
         description,
         verificado,
         foto_verificado
    })
    
    if(tarefa instanceof Error) {
      return res.status(400).send(tarefa.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Tarefa criada com sucesso!",
        tarefa
      }
    );
  }
}

export { CreateTarefaControler };