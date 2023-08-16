import { Router } from "express";
import { createUser } from "./controllers/UserController";
import { createAccess, getAllAccesses } from "./controllers/AcessController";
import { createTipoEquipamento, getAllTipoEquipamentos } from "./controllers/TipoEquipamentoController";
import { createTarefa, getAllTarefas } from "./controllers/TarefaController";
import { createChecklist, getAllChecklists } from "./controllers/ChecklistController";
import { createStation } from "./controllers/StationController";
import { CreateAntenaControler } from "./controllers/antenas/CreateAntenaController";
import { GetAntenaController } from "./controllers/antenas/GetAntenaController";
import { FindAntenaController } from "./controllers/antenas/FindAntenaController";
import { UpdateAntenaController } from "./controllers/antenas/UpdateAntenaController";
import { DeleteAntenaController } from "./controllers/antenas/DeleteAntenaController";
import { GetArcondicionadoController } from "./controllers/arcondicionados/GetArcondicionadoController";
import { CreateArcondicionadoController } from "./controllers/arcondicionados/CreateArcondicionadoController";
import { FindArcondicionadoController } from "./controllers/arcondicionados/FindArcondicionadoController";
import { UpdateArcondicionadoController } from "./controllers/arcondicionados/UpdateArcondicionadoController";
import { DeleteArcondicionadoController } from "./controllers/arcondicionados/DeleteArcondicionadoController";

export const router = Router()

router.post("/user", createUser)

router.post("/access", createAccess)
router.get("/accesses", getAllAccesses)

//Rotas para Antena
router
  .route("/antenas")
  .get(new GetAntenaController().handle)
  .post(new CreateAntenaControler().handle)
router
  .route("/antenas/:id")
  .get(new FindAntenaController().handle)
  .put(new UpdateAntenaController().handle)
  .delete(new DeleteAntenaController().handle)

//Rotas para Arcondicionados
router
  .route("/arcondicionados")
  .get(new GetArcondicionadoController().handle)
  .post(new CreateArcondicionadoController().handle)
router
  .route("/arcondicionados/:id")
  .get(new FindArcondicionadoController().handle)
  .put(new UpdateArcondicionadoController().handle)
  .delete(new DeleteArcondicionadoController().handle)

router.post("/tarefa", createTarefa)
router.get("/tarefas", getAllTarefas)

router.post("/tipo-equipamento", createTipoEquipamento)
router.get("/tipo-equipamentos", getAllTipoEquipamentos)

router.post("/checklist", createChecklist)
router.get("/checklists", getAllChecklists)

router.post("/station", createStation)