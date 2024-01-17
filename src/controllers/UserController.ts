import { Request, Response } from "express"
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, accessName, contato, empresa, contato_empresa, manutencao } = req.body;

  const isUserUniqueEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  const isAccessName = await prisma.access.findUnique({
    where: {
      name: accessName
    }
  })

  if(!isAccessName) {
    return res.status(400).json({message: "Esse nível de usuário não existe!"})
  }

  if(isUserUniqueEmail) {
    return res.status(400).json({message: "Já existe um usuário com esse email!"})
  }

  const hashPassowrd = await hash(password, 8)

  const user = await prisma.user.create({
    data: { name, email, password: hashPassowrd, 
      contato,
      empresa,
      contato_empresa,
      manutencao,
      Access: {
      connect: {
        name: accessName
      }
    } },
    select: {
      id: true,
      name: true,
      email: true,
      contato: true,
      contato_empresa: true,
      empresa: true,
      Access: {
        select: {
          name: true
        }
      }
    }
  });

  return res.json(user);
}
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  if (users) {
    return res.json(users);
  } else {
    return res.json({
      message: "Não há usuários cadastrados"
    })
  }
}
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Obtendo os parâmetros da requisição
    const { id } = req.params;
    const { name, email, password, accessName, contato, empresa, contato_empresa, manutencao } = req.body || {};

    // Verificando se o usuário existe
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id
      },
    });

    // Se o usuário não existe, retorna um erro 404
    if (!existingUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificando se o nível de acesso existe
    const existingAccess = await prisma.access.findUnique({
      where: {
        name: accessName,
      },
    });

    // Se o nível de acesso não existe, retorna um erro 400
    if (!existingAccess) {
      return res.status(400).json({ message: "Esse nível de usuário não existe!" });
    }

    // Hash da senha se ela estiver presente
    let hashedPassword;
    if (password) {
      hashedPassword = await hash(password, 8);
    }

    // Atualizando o usuário no banco de dados
    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name,
        email,
        password: hashedPassword,
        contato,
        empresa,
        contato_empresa,
        manutencao,
        Access: {
          connect: {
            name: accessName,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        contato: true,
        empresa: true,
        contato_empresa: true,
        manutencao: true,
        Access: {
          select: {
            name: true,
          },
        },
      },
    });

    // Retornando o usuário atualizado
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};