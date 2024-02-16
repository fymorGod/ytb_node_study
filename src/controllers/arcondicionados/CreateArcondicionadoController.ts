import { Request, Response } from "express";
import { PrismaArcondicionadoRepository } from "../../repositories/prisma/prisma-arcondicionados-repository";
import { CreateArcondicionadoService } from "../../services/arcondicionados/CreateArcondicionadoService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_ArcondiconadoService } from "../../services/documents/CreateDocumentArcondiconado";
import { PrismaDocumentArcondicionadoRepository } from "../../repositories/prisma/documents/prisma-document_arcondicionado_repository";


class CreateArcondicionadoController {
  async handle(req: Request, res: Response) {
    const { codigo, marca, modelo, categoria, status, potencia, tensao, tipo_equipamento, station_id } = req.body;

    const prismaArcondicionadoRepository = new PrismaArcondicionadoRepository();
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const prismaDocumentsArcondicionadoRepository = new PrismaDocumentArcondicionadoRepository();
    
    const createArcondicionado = new CreateArcondicionadoService(prismaArcondicionadoRepository);
    
    const arcondicionado = await createArcondicionado.execute({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      potencia,
      tensao,
      tipo_equipamento,
      station_id
    });

    if(arcondicionado instanceof Error) {
      return res.status(400).json({ error: arcondicionado.message });
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {

        const createDocumentService = new CreateDocumentService(prismaDocumentRepository);
        const createDocumentArcondiconadoService = new CreateDocument_ArcondiconadoService(prismaDocumentsArcondicionadoRepository);

        // Verificando se o documento inserido foi PNG
        if (Object.keys(req.files).includes("foto")) {

          const indice = Object.keys(req.files).indexOf("foto")

          const path = "http://192.168.6.2:3001/files/" + Object.values(req.files)[indice][0].filename;
          const filename = "http://192.168.6.2:3001/files/" + Object.values(req.files)[indice][0].filename;
          const originalName = Object.values(req.files)[indice][0].originalname;
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          // Retornando mensagem de erro caso aconteça algum errro na criação do doc
          if (docCriado instanceof Error) {
            return res.status(400).json(docCriado.message);
          }

          const documentoId = docCriado?.document?.id;
          console.log(documentoId)
          const arcondicionadoId = Object(arcondicionado).id;
          console.log(arcondicionadoId)

          // Criando o documento da condensadora
          const doc_arcondicionadoCreated = await createDocumentArcondiconadoService.execute({ documentoId, arcondicionadoId });

          if (doc_arcondicionadoCreated instanceof Error) {
            return res.status(400).json(doc_arcondicionadoCreated);
          }
        }

        // Verificando se o documento inserido foi PDF
        if (Object.keys(req.files).includes("file")) {

          const indice = Object.keys(req.files).indexOf("file")

          const path = "http://192.168.6.2:3001/files" + Object.values(req.files)[indice][0].filename;
          const filename = "http://192.168.6.2:3001/files" + Object.values(req.files)[indice][0].filename;
          const originalName = Object.values(req.files)[indice][0].originalname;
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          const documentoId = docCriado?.document?.id;
          const arcondicionadoId = Object(arcondicionado).id;
          console.log(documentoId)
          console.log(arcondicionadoId)
          const doc_arcondicionadoCreated = await createDocumentArcondiconadoService.execute({ documentoId, arcondicionadoId });

          if (doc_arcondicionadoCreated instanceof Error) {
            return res.status(400).json(doc_arcondicionadoCreated);
          }
        }
      }

    }
    return res.status(201).json({
      message: "Arcondicionado criado com sucesso!",
      arcondicionado
    });
  }
}

export { CreateArcondicionadoController };