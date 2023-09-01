import { StationRepository } from "../../repositories/interfaces/station/station-repository";


interface UpdateStationRequest {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  link_grafana?: string;
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

export class UpdateStationService {

  constructor(
    private stationRepository: StationRepository
  ) {}

  async execute(request: UpdateStationRequest) {
    const {id, name, address, latitude, link_grafana, longitude ,antena, arcondicionado, cabo, combinador, disjuntor, dps, exaustor, nobreak, quadro, receptor, switchies, telemetria, torre, transmissor} = request;

    const station = await this.stationRepository.find({id});

    if(!station) {
      return new Error("Station inexistente!")
    }
    if(name) {
      if(await this.stationRepository.findByName({ name })) {
        return new Error("Station já existente!")
      }
    }

    try {
      return await this.stationRepository.update({
        id,
        name,
        address,
        latitude,
        link_grafana,
        longitude,
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