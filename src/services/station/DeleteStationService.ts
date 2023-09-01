import { StationRepository } from "../../repositories/interfaces/station/station-repository";

interface DeleteStationRequest {
  id: string;
}

export class DeleteStationService {

  constructor(
    private stationRepository: StationRepository
  ) {}

  async execute(request: DeleteStationRequest) {

    const { id } = request;

    const station = await this.stationRepository.find({ id });

    if(!station) {
      return new Error("Station inexistente!")
    }

    try {
      await this.stationRepository.delete({ id })
    } catch (error) {
      return error
    }
  }
}