import { Request, Response } from "express"
import { prisma } from "../database/prisma";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController{
  async authenticate (req: Request, res: Response) {
    const { email, password } = req.body;
  
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        contato: true,
        contato_empresa: true,
        empresa: true
      }
    })
  
    if(!user) {
      return res.status(400).json({message: "User not found!"})
    }
  
    const isValuePassword = await compare(password, user.password);
  
    if(!isValuePassword) {
      return res.json({ error: "Passowrd invalid"})
    }
    //Generated User Token
    const token = sign({id: user.id}, "secret", {
      subject: Object(user.id),
      expiresIn: "1d"
    });
  
    return res.send({
      id: user.id,
      name: user.name,
      email: user.email,
      empresa: user.empresa,
      contato: user.contato,
      contato_empresa: user.contato_empresa, 
      token
    });
  }
} 