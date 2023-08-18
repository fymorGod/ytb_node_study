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
import { GetCaboController } from "./controllers/cabos/GetCaboController";
import { CreateCaboController } from "./controllers/cabos/CreateCaboController";
import { FindCaboController } from "./controllers/cabos/FindCaboController";
import { UpdateCaboController } from "./controllers/cabos/UpdateCaboController";
import { DeleteCaboController } from "./controllers/cabos/DeleteCaboController";
import { AuthController } from "./controllers/AuthController";
import { GetCombinadorController } from "./controllers/combinador/GetCombinadorController";
import { CreateCombinadorControler } from "./controllers/combinador/CreateCombinadorController";
import { FindCombinadorController } from "./controllers/combinador/FindCombinadorController";
import { UpdateCombinadorController } from "./controllers/combinador/UpdateCombinadorController";
import { DeleteCombinadorController } from "./controllers/combinador/DeleteCombinadorController";

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

//Rotas para Cabos
router
  .route("/cabos")
  .get(new GetCaboController().handle)
  .post(new CreateCaboController().handle)
router
  .route("/cabos/:id")
  .get(new FindCaboController().handle)
  .put(new UpdateCaboController().handle)
  .delete(new DeleteCaboController().handle)

//Rotas para Combinadores
router
  .route("/combinador")
  .get(new GetCombinadorController().handle)
  .post(new CreateCombinadorControler().handle)
router
  .route("/combinador/:id")
  .get(new FindCombinadorController().handle)
  .put(new UpdateCombinadorController().handle)
  .delete(new DeleteCombinadorController().handle)
  
//Rotas para Authenticate
router
  .route("/auth")
  .post(new AuthController().authenticate)

router.post("/tarefa", createTarefa)
router.get("/tarefas", getAllTarefas)

router.post("/tipo-equipamento", createTipoEquipamento)
router.get("/tipo-equipamentos", getAllTipoEquipamentos)

router.post("/checklist", createChecklist)
router.get("/checklists", getAllChecklists)

router.post("/station", createStation)