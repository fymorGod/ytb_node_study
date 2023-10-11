import { Request, Response } from "express";
import { PrismaManutencaoRepository } from "../../repositories/prisma/prisma-manutencao-repository";
import { CreateManutencaoService } from "../../services/manutencao/CreateManutencaoService";

class CreateManutencaoControler {
  
  async handle(req: Request, res: Response) {
    const { dataCreate, tipo, checklist, observacao, stationId, status, userId } = req.body;

    const prismaManutencaoRepository = new PrismaManutencaoRepository();

    // Service
    const createManutencaoService = new CreateManutencaoService(prismaManutencaoRepository);

    //executando o service
    const manutencao = await createManutencaoService.execute({
      checklist,
      dataCreate,
      observacao,
      stationId,
      status,
      tipo,
      userId
    })
    
    if(manutencao instanceof Error) {
      return res.status(400).send(manutencao.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Manutencão criado com sucesso!",
        manutencao
      }
    );
  }
}

export { CreateManutencaoControler };