import { Request, Response } from "express";
import { PrismaCombinadorRepository } from "../../repositories/prisma/prisma-combinador-repository";
import { CreateCombinadorService } from "../../services/combinador/CreateCombinadorService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentCombinadorRepository } from "../../repositories/prisma/documents/prisma-document_combinador_repository";
import { CreateDocument_CombinadorService } from "../../services/documents/CreateDocumentCombinador";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";


class CreateCombinadorControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, tipo_equipamento, station_id } = req.body;

    const prismaCombinadorRepository = new PrismaCombinadorRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsCombinadorRespository = new PrismaDocumentCombinadorRepository()
    // Service
    const createCombinadorService = new CreateCombinadorService(prismaCombinadorRepository);

    //executando o service
    const combinador = await createCombinadorService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         tipo_equipamento,
         station_id
    })
    
    if(combinador instanceof Error) {
      return res.status(400).send(combinador.message)
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentCombinadorService = new CreateDocument_CombinadorService(prismaDocumentsCombinadorRespository);

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
          const combinadorId = Object(combinador).id;
          console.log(combinadorId)

          // Criando o documento da condensadora
          const doc_combinadorCreated = await createDocumentCombinadorService.execute({ documentoId, combinadorId });

          if (doc_combinadorCreated instanceof Error) {
            return res.status(400).json(doc_combinadorCreated);
          }
        }

        // Verificando se o documento inserido foi PDF
        if (Object.keys(req.files).includes("file")) {

          const indice = Object.keys(req.files).indexOf("file")

          const path = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
          const filename = "http://192.168.6.2:3333/files/" + Object.values(req.files)[indice][0].filename;
          const originalName = Object.values(req.files)[indice][0].originalname.replace(/\s/g, '_');
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          const documentoId = docCriado?.document?.id;
          const combinadorId = Object(combinador).id;
          console.log(documentoId)
          console.log(combinadorId)
          const doc_combinadorCreated = await createDocumentCombinadorService.execute({ documentoId, combinadorId });

          if (doc_combinadorCreated instanceof Error) {
            return res.status(400).json(doc_combinadorCreated);
          }
        }
      }

    }
    //return message to user
    return res.status(201).send(
      {
        message: "Combinador criado com sucesso!",
        combinador
      }
    );
  }
}

export { CreateCombinadorControler };