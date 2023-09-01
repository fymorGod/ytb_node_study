import { AntenaRepository } from "../../repositories/interfaces/antena/antena-repository"
import { ArcondicionadoRepository } from "../../repositories/interfaces/arcondicionado/arcondicionado-repository"
import { CaboRepository } from "../../repositories/interfaces/cabo/cabo-repository"
import { CombinadorRepository } from "../../repositories/interfaces/combinador/combinador-repository"
import { DisjuntorRepository } from "../../repositories/interfaces/disjuntor/disjuntor-repository"
import { DpsRepository } from "../../repositories/interfaces/dps/dps-repository"
import { ExaustorRepository } from "../../repositories/interfaces/exaustor/exaustor-repository"
import { NobreakRepository } from "../../repositories/interfaces/nobreak/nobreak-repository"
import { QuadroRepository } from "../../repositories/interfaces/quadro/quadro-repository"
import { ReceptorRepository } from "../../repositories/interfaces/receptor/receptor-repository"
import { StationRepository } from "../../repositories/interfaces/station/station-repository"
import { SwitchRepository } from "../../repositories/interfaces/switchies/switchies-repository"
import { TelemetriaRepository } from "../../repositories/interfaces/telemetria/telemetria-repository"
import { TorreRepository } from "../../repositories/interfaces/torre/torre-repository"
import { TransmissorRepository } from "../../repositories/interfaces/transmissor/transmissor-repository"

interface CreateStationRequest {
  name: string
  latitude: string
  longitude: string
  address: string
  link_grafana: string;
  status: string;
  antena?: string;
  arcondicionado?: string;
  cabo?: string;
  combinador?: string;
  disjuntor?: string;
  dps?: string;
  exaustor?: string;
  nobreak?: string;
  quadro?: string;
  receptor?: string;
  switchies?: string;
  telemetria?: string;
  torre?: string;
  transmissor?: string;
}

export class CreateStationService {
  constructor(
    private stationRepository: StationRepository,
    // private antenaRepository: AntenaRepository,
    // private arcondicionadoRepository: ArcondicionadoRepository,
    // private caboRepository: CaboRepository,
    // private combinadorRepository: CombinadorRepository,
    // private disjuntorRepository: DisjuntorRepository,
    // private dpsRepository: DpsRepository,
    // private exaustorRepository: ExaustorRepository,
    // private nobreakRepository: NobreakRepository,
    // private quadroRepository: QuadroRepository,
    // private receptorRepository: ReceptorRepository,
    // private switchRepository: SwitchRepository,
    // private telemetriaRepository: TelemetriaRepository,
    // private torreRepository: TorreRepository,
    // private transmissorRepository: TransmissorRepository
  ) {}

  async execute(request: CreateStationRequest) {
    
    //Dados do service
    const { name, address, latitude, link_grafana, longitude, status,antena, arcondicionado, cabo, combinador, disjuntor, dps, exaustor, nobreak, quadro, receptor, switchies, telemetria, torre, transmissor }= request;
    
    // const condensadora = await this.antenaRepository.find({ id:antena });

    try {
      return await this.stationRepository.create({
        name,
        address,
        latitude,
        link_grafana,
        longitude,
        status,
        antena, 
        arcondicionado, 
        cabo, 
        combinador, 
        disjuntor, 
        dps,
        exaustor,
        nobreak,
        quadro,
        receptor,
        switchies,
        telemetria,
        torre,
        transmissor
      })
    } catch (error) {
      return error
    }
  }
}