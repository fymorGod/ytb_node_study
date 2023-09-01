import { Response } from "express";

export const verifyError = (active: any, res: Response, ) => {
  const allActives:any = [];

  if( active ){
    active.map((ativo:any) => {
      if(ativo instanceof Error) {
        return res.status(400).json({ error: ativo.message });
      }
      allActives.push(ativo);
    })
  }
 return allActives;
}