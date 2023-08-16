import { Request, Response } from "express"
import { prisma } from "../database/prisma";
// import path from 'path';

export const createStation = async (req: Request, res: Response) => {
  const {name, latitude, longitude, address, link_grafana, status } = req.body;

  const station = await prisma.station.create({
    data: {  name, latitude, longitude, address, link_grafana, status }
  }

);

  return res.json(station);
}

export const getAllStations = async (req:Request, res: Response) => {
  const stations = await prisma.station.findMany()

  return res.json(stations)
}