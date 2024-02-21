import { Request, Response } from "express"
import { prisma } from "../database/prisma";
import { hash } from 'bcryptjs'; 
import { PrismaDocumentRepository } from "../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentUserRepository } from "../repositories/prisma/documents/prisma-document-user_repository";
import { CreateDocumentService } from "../services/documents/CreateDocumentoService";
import { CreateDocument_UserService } from "../services/documents/CreateDocumentUser";
 
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, accessName, contato, empresa, contato_empresa, manutencao } = req.body;
  console.log(name)
  const prismaDocumentRepository = new PrismaDocumentRepository();
  const prismaDocumentsUserRepository = new PrismaDocumentUserRepository();

  // const isUserUniqueEmail = await prisma.user.findUnique({
  //   where: {
  //     email
  //   }
  // })

  // const isAccessName = await prisma.access.findUnique({
  //   where: {
  //     name: accessName
  //   }
  // })

  // if(!isAccessName) {
  //   return res.status(400).json({message: "Esse nível de usuário não existe!"})
  // }

  // if(isUserUniqueEmail) {
  //   return res.status(400).json({message: "Já existe um usuário com esse email!"})
  // }

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
 // Criando os documentos
 if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentUserService = new CreateDocument_UserService(prismaDocumentsUserRepository);

    // Verificando se o documento inserido foi PNG
    if (Object.keys(req.files).includes("foto")) {

      const indice = Object.keys(req.files).indexOf("foto")

      const path = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
      const filename = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
     const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
      const fileFormat = Object.values(req.files)[indice][0].mimetype;

      const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

      // Retornando mensagem de erro caso aconteça algum errro na criação do doc
      if (docCriado instanceof Error) {
        return res.status(400).json(docCriado.message);
      }

      const documentoId = docCriado?.document?.id;
      console.log(documentoId)
      const userId = Object(user).id;
      console.log(userId)

      // Criando o documento da condensadora
      const doc_userCreated = await createDocumentUserService.execute({ documentoId, userId });

      if (doc_userCreated instanceof Error) {
        return res.status(400).json(doc_userCreated);
      }
    }

    // Verificando se o documento inserido foi PDF
    if (Object.keys(req.files).includes("file")) {

      const indice = Object.keys(req.files).indexOf("file")

      const path = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
      const filename = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
     const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
      const fileFormat = Object.values(req.files)[indice][0].mimetype;

      const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

      const documentoId = docCriado?.document?.id;
      const userId = Object(user).id;
      console.log(documentoId)
      console.log(userId)
      const doc_userCreated = await createDocumentUserService.execute({ documentoId, userId });

      if (doc_userCreated instanceof Error) {
        return res.status(400).json(doc_userCreated);
      }
    }
  }

}
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
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsUserRepository = new PrismaDocumentUserRepository();
     // Criando os documentos
 if (req.files != null || req.files != undefined) {

  // Se o usuário enviar algum documento (PDF ou PNG)
  if (Object.keys(req.files).length > 0) {

    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
    const createDocumentUserService = new CreateDocument_UserService(prismaDocumentsUserRepository);

    // Verificando se o documento inserido foi PNG
    if (Object.keys(req.files).includes("foto")) {

      const indice = Object.keys(req.files).indexOf("foto")

      const path = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
      const filename = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
     const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
      const fileFormat = Object.values(req.files)[indice][0].mimetype;

      const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

      // Retornando mensagem de erro caso aconteça algum errro na criação do doc
      if (docCriado instanceof Error) {
        return res.status(400).json(docCriado.message);
      }

      const documentoId = docCriado?.document?.id;
      console.log(documentoId)
      const userId = Object(updatedUser).id;
      console.log(userId)

      // Criando o documento da condensadora
      const doc_userCreated = await createDocumentUserService.execute({ documentoId, userId });

      if (doc_userCreated instanceof Error) {
        return res.status(400).json(doc_userCreated);
      }
    }

    // Verificando se o documento inserido foi PDF
    if (Object.keys(req.files).includes("file")) {

      const indice = Object.keys(req.files).indexOf("file")

      const path = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
      const filename = "http://192.168.6.2:3333/files" + Object.values(req.files)[indice][0].filename;
     const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
      const fileFormat = Object.values(req.files)[indice][0].mimetype;

      const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

      const documentoId = docCriado?.document?.id;
      const userId = Object(updatedUser).id;
      console.log(documentoId)
      console.log(userId)
      const doc_userCreated = await createDocumentUserService.execute({ documentoId, userId });

      if (doc_userCreated instanceof Error) {
        return res.status(400).json(doc_userCreated);
      }
    }
  }

}
    // Retornando o usuário atualizado
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};