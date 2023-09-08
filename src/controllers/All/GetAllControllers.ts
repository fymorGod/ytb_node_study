import { Request, Response } from "express";
import { PrismaAntenaRepository } from "../../repositories/prisma/prisma-antenas-repository";
import { GetAntenaService } from "../../services/antenas/GetAntenaService";
import { PrismaArcondicionadoRepository } from "../../repositories/prisma/prisma-arcondicionados-repository";
import { GetArcondicionadoService } from "../../services/arcondicionados/GetArcondicionadoService";
import { PrismaCaboRepository } from "../../repositories/prisma/prisma-cabo-repository";
import { GetCaboService } from "../../services/cabos/GetCaboService";
import { PrismaCombinadorRepository } from "../../repositories/prisma/prisma-combinador-repository";
import { GetCombinadorService } from "../../services/combinador/GetCombinadorService";
import { PrismaDisjuntorRepository } from "../../repositories/prisma/prisma-disjuntor-repository";
import { GetDisjuntorService } from "../../services/disjuntor/GetDisjuntorService";
import { PrismaDpsRepository } from "../../repositories/prisma/prisma-dps-repository";
import { GetDpsService } from "../../services/dps/GetDpsService";
import { PrismaExaustorRepository } from "../../repositories/prisma/prisma-exaustor-repository";
import { GetExaustorService } from "../../services/exaustor/GetExaustorService";
import { PrismaNobreakRepository } from "../../repositories/prisma/prisma-nobreak-repository";
import { GetNobreakService } from "../../services/nobreak/GetNobreakService";
import { PrismaParabolicaRepository } from "../../repositories/prisma/prisma-parabolica-repository";
import { GetParabolicaService } from "../../services/parabolica/GetParabolicaService";
import { PrismaQuadroRepository } from "../../repositories/prisma/prisma-quadro-repository";
import { GetQuadroService } from "../../services/quadro/GetQuadroService";
import { PrismaReceptorRepository } from "../../repositories/prisma/prisma-receptor-repository";
import { GetReceptorService } from "../../services/receptor/GetReceptorService";
import { PrismaSwitchRepository } from "../../repositories/prisma/prisma-switch-repository";
import { GetSwitchService } from "../../services/switchies/GetSwitchService";
import { PrismaTelemetriaRepository } from "../../repositories/prisma/prisma-telemetria-repository";
import { GetTelemetriaService } from "../../services/telemetria/GetTelemetriaService";
import { PrismaTorreRepository } from "../../repositories/prisma/prisma-torre-repository";
import { GetTorreService } from "../../services/torre/GetTorreService";
import { PrismaTransmissorRepository } from "../../repositories/prisma/prisma-transmissor-repository";
import { GetTransmissorService } from "../../services/transmissor/GetTransmissorService";

//Por favor não abrir essa função - ! WARNING ☠ ! 
class GetAllController {
  async handle(req: Request, res: Response) {
    const allActives = [];

    const prismaAntenaRepository = new PrismaAntenaRepository()
    const getAntenasService = new GetAntenaService(prismaAntenaRepository);
    const antenas = await getAntenasService.execute();

    const prismaArcondicionadoRepository = new PrismaArcondicionadoRepository();
    const getArcondicionadoService = new GetArcondicionadoService(prismaArcondicionadoRepository);
    const arcondicionado = await getArcondicionadoService.execute();

    const prismaCaboRepository = new PrismaCaboRepository()
    const getCaboService = new GetCaboService(prismaCaboRepository);
    const cabos = await getCaboService.execute();

    const prismaCombinadorRepository = new PrismaCombinadorRepository();
    const getCombinadorService = new GetCombinadorService(prismaCombinadorRepository);
    const combinador = await getCombinadorService.execute();

    const prismaDisjuntorRepository = new PrismaDisjuntorRepository();
    const getDisjuntorService = new GetDisjuntorService(prismaDisjuntorRepository);
    const disjuntores = await getDisjuntorService.execute();

    const prismaDpsRepository = new PrismaDpsRepository();
    const getDpsService = new GetDpsService(prismaDpsRepository);
    const dps = await getDpsService.execute();
    
    const prismaExaustorRepository = new PrismaExaustorRepository();
    const getExaustorService = new GetExaustorService(prismaExaustorRepository);
    const exaustor = await getExaustorService.execute();

    const prismaNobreakRepository = new PrismaNobreakRepository();
    const getNobreaksService = new GetNobreakService(prismaNobreakRepository);
    const nobreak = await getNobreaksService.execute();

    const prismaParabolicaRepository = new PrismaParabolicaRepository();
    const getParabolicasService = new GetParabolicaService(prismaParabolicaRepository);
    const parabolicas = await getParabolicasService.execute();

    const prismaQuadroRepository = new PrismaQuadroRepository();
    const getQuadrosService = new GetQuadroService(prismaQuadroRepository);
    const quadro = await getQuadrosService.execute();

    const prismaReceptorRepository = new PrismaReceptorRepository();
    const getReceptorsService = new GetReceptorService(prismaReceptorRepository);
    const receptor = await getReceptorsService.execute();

    const prismaSwitchRepository = new PrismaSwitchRepository();
    const getSwitchsService = new GetSwitchService(prismaSwitchRepository);
    const switchs = await getSwitchsService.execute();

    const prismaTelemetriaRepository = new PrismaTelemetriaRepository();
    const getTelemetriaService = new GetTelemetriaService(prismaTelemetriaRepository);
    const telemetria = await getTelemetriaService.execute();

    const prismaTorreRepository = new PrismaTorreRepository();
    const getTorresService = new GetTorreService(prismaTorreRepository);
    const torre = await getTorresService.execute();

    const prismaTransmissorRepository = new PrismaTransmissorRepository();
    const getTransmissorsService = new GetTransmissorService(prismaTransmissorRepository);
    const transmissor = await getTransmissorsService.execute();

    allActives.push({"antenas": antenas})
    allActives.push({"arCondicionados": arcondicionado})
    allActives.push({"cabos" : cabos})
    allActives.push({"combinadores" : combinador})
    allActives.push({"disjuntores" : disjuntores})
    allActives.push({"dps" : dps})
    allActives.push({"exaustor" : exaustor})
    allActives.push({"nobreak" : nobreak})
    allActives.push({"parabolicas" : parabolicas})
    allActives.push({"quadro" : quadro})
    allActives.push({"receptor" : receptor})
    allActives.push({"switchs" : switchs})
    allActives.push({"telemetria" : telemetria})
    allActives.push({"torre" : torre})
    allActives.push({"transmissor" : transmissor})

    if(antenas instanceof Error) {
      return res.status(400).send(antenas.message)
    }
    if(arcondicionado instanceof Error) {
      return res.status(400).json({ error: arcondicionado.message });
    }
    if( cabos instanceof Error) {
      return res.status(400).json({ error: cabos.message })
    }
    if(combinador instanceof Error) {
      return res.status(400).send(combinador.message)
    }
    if(disjuntores instanceof Error) {
      return res.status(400).send(disjuntores.message)
    }
    if(dps instanceof Error) {
      return res.status(400).send(dps.message)
    }
    if(exaustor instanceof Error) {
      return res.status(400).send(exaustor.message)
    }
    if(nobreak instanceof Error) {
      return res.status(400).send(nobreak.message)
    }
    if(parabolicas instanceof Error) {
      return res.status(400).send(parabolicas.message)
    }
    if(quadro instanceof Error) {
      return res.status(400).send(quadro.message)
    }
    if(receptor instanceof Error) {
      return res.status(400).send(receptor.message)
    }
    if(switchs instanceof Error) {
      return res.status(400).send(switchs.message)
    }
    if(telemetria instanceof Error) {
      return res.status(400).send(telemetria.message)
    }
    if(torre instanceof Error) {
      return res.status(400).send(torre.message)
    }
    if(transmissor instanceof Error) {
      return res.status(400).send(transmissor.message)
    }

    return res.status(200).send(allActives);
  }
}

export { GetAllController };