import { Request, Response } from "express";
import { CreateParabolicaService } from "../../services/parabolica/CreateParabolicaService";
import { PrismaParabolicaRepository } from "../../repositories/prisma/prisma-parabolica-repository";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { PrismaDocumentParabolicaRepository } from "../../repositories/prisma/documents/prisma-document_parabolica_repository";
import { CreateDocument_ParabolicaService } from "../../services/documents/CreateDocumentParabolica";

class CreateParabolicaControler {
  
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, diametro, satelite, tipo_equipamento, station_id  } = req.body;

    const prismaParabolicaRepository = new PrismaParabolicaRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsParabolicaRepository = new PrismaDocumentParabolicaRepository();
    // Service
    const createParabolicaService = new CreateParabolicaService(prismaParabolicaRepository);

    //executando o service
    const parabolica = await createParabolicaService.execute({
         codigo,
         marca,
         modelo,
         categoria,
         status,
         diametro,
         satelite,
         tipo_equipamento,
         station_id
    })
    
    if(parabolica instanceof Error) {
      return res.status(400).send(parabolica.message)
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentParabolicaService = new CreateDocument_ParabolicaService(prismaDocumentsParabolicaRepository);

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
          const parabolicaId = Object(parabolica).id;
          console.log(parabolicaId)

          // Criando o documento da condensadora
          const doc_parabolicaCreated = await createDocumentParabolicaService.execute({ documentoId, parabolicaId });

          if (doc_parabolicaCreated instanceof Error) {
            return res.status(400).json(doc_parabolicaCreated);
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
          const parabolicaId = Object(parabolica).id;
          console.log(documentoId)
          console.log(parabolicaId)
          const doc_parabolicaCreated = await createDocumentParabolicaService.execute({ documentoId, parabolicaId });

          if (doc_parabolicaCreated instanceof Error) {
            return res.status(400).json(doc_parabolicaCreated);
          }
        }
      }

    }
    //return message to user
    return res.status(201).send(
      {
        message: "Parabolica criada com sucesso!",
        parabolica
      }
    );
  }
}

export { CreateParabolicaControler };