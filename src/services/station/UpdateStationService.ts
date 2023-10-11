import { StationRepository, stationStatus } from "../../repositories/interfaces/station/station-repository";


interface UpdateStationRequest {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  link_grafana?: string;
  status: stationStatus;
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
  manutencaoId?: string;
}

export class UpdateStationService {

  constructor(
    private stationRepository: StationRepository
  ) {}

  async execute(request: UpdateStationRequest) {
    const {id, name, address, latitude, link_grafana, longitude, status, manutencaoId } = request;

    const station = await this.stationRepository.find({id});

    if(!station) {
      return new Error("Station inexistente!")
    }

    try {
      return await this.stationRepository.update({
        id,
        name,
        address,
        latitude,
        link_grafana,
        longitude,
        status,
        manutencaoId
      })
    } catch (error) {
      return error
    }
  }
}