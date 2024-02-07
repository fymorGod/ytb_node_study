import { Request, Response } from "express";
import { PrismaTarefaRepository } from "../../repositories/prisma/prisma-tarefa-repository";
import { UpdateTarefaService } from "../../services/tarefa/UpdateTarefaService";
import { PrismaDocumentRepository } from "../../repositories/prisma/documents/prisma-document-repository";
import { PrismaDocumentTarefaRepository } from "../../repositories/prisma/documents/prisma-document_tarefa_repository";
import { CreateDocumentService } from "../../services/documents/CreateDocumentoService";
import { CreateDocument_TarefaService } from "../../services/documents/CreateDocumentTarefa";

class UpdateTarefaController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { description, verificado, foto_verificado } = req.body;

    const prismaTarefaRepository = new PrismaTarefaRepository()
    const prismaDocumentRepository = new PrismaDocumentRepository();
    const createDocumentService = new CreateDocumentService(prismaDocumentRepository);

    const prismaDocumentsTarefaRepository = new PrismaDocumentTarefaRepository();
    const createDocumentTarefaService = new CreateDocument_TarefaService(prismaDocumentsTarefaRepository);

    const updateTarefaService = new UpdateTarefaService(prismaTarefaRepository);

    const tarefa = await updateTarefaService.execute({
      id,
      description,
      verificado,
      foto_verificado
    });
    console.log(Object(tarefa))

    if (tarefa instanceof Error) {
      return res.status(400).send({ error: tarefa.message });
    }
    // Criando os documentos
    if (req.files != null || req.files != undefined) {

      // Se o usuário enviar algum documento (PDF ou PNG)
      if (Object.keys(req.files).length > 0) {



        // Verificando se o documento inserido foi PNG
        if (Object.keys(req.files).includes("foto")) {

          const indice = Object.keys(req.files).indexOf("foto")

          const path = "http://localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
          const filename = "http://localhost:3001/files/" + Object.values(req.files)[indice][0].filename;
          const originalName = Object.values(req.files)[indice][0].originalname;
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          // Retornando mensagem de erro caso aconteça algum errro na criação do doc
          if (docCriado instanceof Error) {
            return res.status(400).json(docCriado.message);
          }

          const documentoId = docCriado?.document?.id;
          const tarefaId = Object(tarefa).id;
          console.log(documentoId)
          console.log("tarefa " + tarefaId)
          const doc_tarefaCreated = await createDocumentTarefaService.execute({ documentoId, tarefaId });

          if (doc_tarefaCreated instanceof Error) {
            return res.status(400).json(doc_tarefaCreated);
          }
        }

        // Verificando se o documento inserido foi PDF
        if (Object.keys(req.files).includes("file")) {

          const indice = Object.keys(req.files).indexOf("file")

          const path = "http://localhost:3001/files" + Object.values(req.files)[indice][0].filename;
          const filename = "http://localhost:3001/files" + Object.values(req.files)[indice][0].filename;
          const originalName = Object.values(req.files)[indice][0].originalname;
          const fileFormat = Object.values(req.files)[indice][0].mimetype;

          const docCriado = await createDocumentService.execute({ path, filename, originalName, fileFormat });

          const documentoId = docCriado?.document?.id;
          const tarefaId = Object(tarefa).id;
          console.log(documentoId)
          console.log(tarefaId)
          const doc_tarefaCreated = await createDocumentTarefaService.execute({ documentoId, tarefaId });

          if (doc_tarefaCreated instanceof Error) {
            return res.status(400).json(doc_tarefaCreated);
          }
        }
      }

    }


    return res.status(200).json({
      message: "Tarefa atualizada com sucesso!",
    });
  }
}

export { UpdateTarefaController };