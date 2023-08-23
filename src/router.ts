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
import { FindDisjuntorController } from "./controllers/disjuntor/FindDisjuntorController";
import { UpdateDisjuntorController } from "./controllers/disjuntor/UpdateDisjuntorController";
import { GetDisjuntorController } from "./controllers/disjuntor/GetDisjuntorController";
import { CreateDisjuntorControler } from "./controllers/disjuntor/CreateDisjuntorController";
import { DeleteDisjuntorController } from "./controllers/disjuntor/DeleteDisjuntorController";
import { GetDpsController } from "./controllers/dps/GetDpsController";
import { CreateDpsControler } from "./controllers/dps/CreateDpsController";
import { FindDpsController } from "./controllers/dps/FindDpsController";
import { UpdateDpsController } from "./controllers/dps/UpdateDpsController";
import { DeleteDpsController } from "./controllers/dps/DeleteDpsController";
import { GetExaustorController } from "./controllers/exaustor/GetExaustorController";
import { CreateExaustorControler } from "./controllers/exaustor/CreateExaustorController";
import { FindExaustorController } from "./controllers/exaustor/FindExaustorController";
import { UpdateExaustorController } from "./controllers/exaustor/UpdateExaustorController";
import { DeleteExaustorController } from "./controllers/exaustor/DeleteExaustorController";
import { GetNobreakController } from "./controllers/nobreak/GetNobreakController";
import { CreateNobreakControler } from "./controllers/nobreak/CreateNobreakController";
import { FindNobreakController } from "./controllers/nobreak/FindNobreakController";
import { UpdateNobreakController } from "./controllers/nobreak/UpdateNobreakController";
import { DeleteNobreakController } from "./controllers/nobreak/DeleteNobreakController";
import { GetParabolicaController } from "./controllers/parabolica/GetParabolicaController";
import { CreateParabolicaControler } from "./controllers/parabolica/CreateParabolicaController";
import { FindParabolicaController } from "./controllers/parabolica/FindParabolicaController";
import { UpdateParabolicaController } from "./controllers/parabolica/UpdateParabolicaController";
import { DeleteParabolicaController } from "./controllers/parabolica/DeleteParabolicaController";
import { GetReceptorController } from "./controllers/receptor/GetReceptorController";
import { CreateReceptorControler } from "./controllers/receptor/CreateReceptorController";
import { FindReceptorController } from "./controllers/receptor/FindReceptorController";
import { UpdateReceptorController } from "./controllers/receptor/UpdateReceptorController";
import { DeleteReceptorController } from "./controllers/receptor/DeleteReceptorController";

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

//Rotas para Disjuntor
router
  .route("/disjuntor")
  .get(new GetDisjuntorController().handle)
  .post(new CreateDisjuntorControler().handle)
router
  .route("/disjuntor/:id")
  .get(new FindDisjuntorController().handle)
  .put(new UpdateDisjuntorController().handle)
  .delete(new DeleteDisjuntorController().handle)

//Rotas para Dps
router
.route("/dps")
.get(new GetDpsController().handle)
.post(new CreateDpsControler().handle)
router
.route("/dps/:id")
.get(new FindDpsController().handle)
.put(new UpdateDpsController().handle)
.delete(new DeleteDpsController().handle)

//Rotas para Exaustor
router
.route("/exaustor")
.get(new GetExaustorController().handle)
.post(new CreateExaustorControler().handle)
router
.route("/exaustor/:id")
.get(new FindExaustorController().handle)
.put(new UpdateExaustorController().handle)
.delete(new DeleteExaustorController().handle)

//Rotas para Nobreak
router
.route("/nobreak")
.get(new GetNobreakController().handle)
.post(new CreateNobreakControler().handle)
router
.route("/nobreak/:id")
.get(new FindNobreakController().handle)
.put(new UpdateNobreakController().handle)
.delete(new DeleteNobreakController().handle)

//Rotas para Parabolica
router
.route("/parabolica")
.get(new GetParabolicaController().handle)
.post(new CreateParabolicaControler().handle)
router
.route("/parabolica/:id")
.get(new FindParabolicaController().handle)
.put(new UpdateParabolicaController().handle)
.delete(new DeleteParabolicaController().handle)

//Rotas para Receptor
router
.route("/receptor")
.get(new GetReceptorController().handle)
.post(new CreateReceptorControler().handle)
router
.route("/receptor/:id")
.get(new FindReceptorController().handle)
.put(new UpdateReceptorController().handle)
.delete(new DeleteReceptorController().handle)

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