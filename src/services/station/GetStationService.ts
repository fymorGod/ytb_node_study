import { StationRepository } from "../../repositories/interfaces/station/station-repository";


export class GetStationService {

  constructor(
    private stationRepository: StationRepository
  ) {}

  async execute() {

    const station = await this.stationRepository.get();

    if(Object.keys(station).length == 0) {
      return new Error("Nenhuma station cadastrada!")
    }

    try {
      return station
    } catch (error) {
      return error
    }
  }
}