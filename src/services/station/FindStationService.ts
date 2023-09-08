import { StationRepository } from "../../repositories/interfaces/station/station-repository";

interface FindStationRequest {
  id: string;
}

export class FindStationService {
  constructor(
    private stationRepository: StationRepository
  ) {}

  async execute(request: FindStationRequest) {

    const { id } = request;

    const station = await this.stationRepository.find({ id });

    if(!station) {
      return new Error("Station inexistente!")
    }
    try {
      return station
    } catch (error) {
      return error
    }
  }
}