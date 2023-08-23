import { Request, Response } from "express";
import { CreateParabolicaService } from "../../services/parabolica/CreateParabolicaService";
import { PrismaParabolicaRepository } from "../../repositories/prisma/prisma-parabolica-repository";

class CreateParabolicaControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, diametro, satelite, tipo_equipamento, station_id  } = req.body;

    const prismaParabolicaRepository = new PrismaParabolicaRepository();

    // Service
    const createParabolicaService = new CreateParabolicaService(prismaParabolicaRepository);

    //executando o service
    const parabolica = await createParabolicaService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         diametro,
         satelite,
         tipo_equipamento,
         station_id
    })
    
    if(parabolica instanceof Error) {
      return res.status(400).send(parabolica.message)
    }

    //return message to user
    return res.status(201).send(
      {
        message: "Parabolica criada com sucesso!",
        parabolica
      }
    );
  }
}

export { CreateParabolicaControler };