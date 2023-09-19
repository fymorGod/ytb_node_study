import { Router } from "express";
import { createUser } from "./controllers/UserController";
import { createAccess, getAllAccesses } from "./controllers/AcessController";
import { createTipoEquipamento, getAllTipoEquipamentos } from "./controllers/TipoEquipamentoController";
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
import { GetSwitchController } from "./controllers/switch/GetSwitchController";
import { CreateSwitchControler } from "./controllers/switch/CreateSwitchController";
import { FindSwitchController } from "./controllers/switch/FindSwitchController";
import { UpdateSwitchController } from "./controllers/switch/UpdateSwitchController";
import { DeleteSwitchController } from "./controllers/switch/DeleteSwitchController";
import { GetTorreController } from "./controllers/torre/GetTorreController";
import { CreateTorreControler } from "./controllers/torre/CreateTorreController";
import { FindTorreController } from "./controllers/torre/FindTorreController";
import { UpdateTorreController } from "./controllers/torre/UpdateTorreController";
import { DeleteTorreController } from "./controllers/torre/DeleteTorreController";
import { GetTransmissorController } from "./controllers/transmissor/GetTransmissorController";
import { CreateTransmissorControler } from "./controllers/transmissor/CreateTransmissorController";
import { FindTransmissorController } from "./controllers/transmissor/FindTransmissorController";
import { DeleteTransmissorController } from "./controllers/transmissor/DeleteTransmissorController";
import { UpdateTransmissorController } from "./controllers/transmissor/UpdateTransmissorController";
import { GetQuadroController } from "./controllers/quadro/GetQuadroController";
import { CreateQuadroControler } from "./controllers/quadro/CreateQuadroController";
import { FindQuadroController } from "./controllers/quadro/FindQuadroController";
import { UpdateQuadroController } from "./controllers/quadro/UpdateQuadroController";
import { DeleteQuadroController } from "./controllers/quadro/DeleteQuadroController";
import { GetStationController } from "./controllers/station/GetStationController";
import { CreateStationControler } from "./controllers/station/CreateStationController";
import { FindStationController } from "./controllers/station/FindStationController";
import { UpdateStationController } from "./controllers/station/UpdateStationController";
import { DeleteStationController } from "./controllers/station/DeleteStationController";
import { GetTelemetriaController } from "./controllers/telemetria/GetTelemetriaController";
import { CreateTelemetriaControler } from "./controllers/telemetria/CreateTelemetriaController";
import { FindTelemetriaController } from "./controllers/telemetria/FindTelemetriaController";
import { UpdateTelemetriaController } from "./controllers/telemetria/UpdateTelemetriaController";
import { DeleteTelemetriaController } from "./controllers/telemetria/DeleteTelemetriaController";
import { GetAllController } from "./controllers/All/GetAllControllers";
import { GetTarefaController } from "./controllers/tarefa/GetTarefaController";
import { CreateTarefaControler } from "./controllers/tarefa/CreateTarefaController";
import { FindTarefaController } from "./controllers/tarefa/FindTarefaController";
import { UpdateTarefaController } from "./controllers/tarefa/UpdateTarefaController";
import { DeleteTarefaController } from "./controllers/tarefa/DeleteTarefaController";
import { GetChecklistController } from "./controllers/checklist/GetChecklistController";
import { CreateChecklistControler } from "./controllers/checklist/CreateChecklistController";
import { FindChecklistController } from "./controllers/checklist/FindChecklistController";
import { UpdateChecklistController } from "./controllers/checklist/UpdateChecklistController";
import { DeleteChecklistController } from "./controllers/checklist/DeleteChecklistController";

export const router = Router()

router.post("/user", createUser)

router.post("/access", createAccess)
router.get("/accesses", getAllAccesses)

//Rotas para Antena
router
  .route("/v1/antenas")
  .get(new GetAntenaController().handle)
  .post(new CreateAntenaControler().handle)
router
  .route("/v1/antenas/:id")
  .get(new FindAntenaController().handle)
  .put(new UpdateAntenaController().handle)
  .delete(new DeleteAntenaController().handle)

//Rotas para Arcondicionados
router
  .route("/v1/arcondicionados")
  .get(new GetArcondicionadoController().handle)
  .post(new CreateArcondicionadoController().handle)
router
  .route("/v1/arcondicionados/:id")
  .get(new FindArcondicionadoController().handle)
  .put(new UpdateArcondicionadoController().handle)
  .delete(new DeleteArcondicionadoController().handle)

//Rotas para Cabos
router
  .route("/v1/cabos")
  .get(new GetCaboController().handle)
  .post(new CreateCaboController().handle)
router
  .route("/v1/cabos/:id")
  .get(new FindCaboController().handle)
  .put(new UpdateCaboController().handle)
  .delete(new DeleteCaboController().handle)

//Rotas para Combinadores
router
  .route("/v1/combinador")
  .get(new GetCombinadorController().handle)
  .post(new CreateCombinadorControler().handle)
router
  .route("/v1/combinador/:id")
  .get(new FindCombinadorController().handle)
  .put(new UpdateCombinadorController().handle)
  .delete(new DeleteCombinadorController().handle)

//Rotas para Disjuntor
router
  .route("/v1/disjuntor")
  .get(new GetDisjuntorController().handle)
  .post(new CreateDisjuntorControler().handle)
router
  .route("/v1/disjuntor/:id")
  .get(new FindDisjuntorController().handle)
  .put(new UpdateDisjuntorController().handle)
  .delete(new DeleteDisjuntorController().handle)

//Rotas para Dps
router
  .route("/v1/dps")
  .get(new GetDpsController().handle)
  .post(new CreateDpsControler().handle)
router
  .route("/v1/dps/:id")
  .get(new FindDpsController().handle)
  .put(new UpdateDpsController().handle)
  .delete(new DeleteDpsController().handle)

//Rotas para Exaustor
router
  .route("/v1/exaustor")
  .get(new GetExaustorController().handle)
  .post(new CreateExaustorControler().handle)
router
  .route("/v1/exaustor/:id")
  .get(new FindExaustorController().handle)
  .put(new UpdateExaustorController().handle)
  .delete(new DeleteExaustorController().handle)

//Rotas para Nobreak
router
  .route("/v1/nobreak")
  .get(new GetNobreakController().handle)
  .post(new CreateNobreakControler().handle)
router
  .route("/v1/nobreak/:id")
  .get(new FindNobreakController().handle)
  .put(new UpdateNobreakController().handle)
  .delete(new DeleteNobreakController().handle)

//Rotas para Parabolica
router
  .route("/v1/parabolica")
  .get(new GetParabolicaController().handle)
  .post(new CreateParabolicaControler().handle)
router
  .route("/v1/parabolica/:id")
  .get(new FindParabolicaController().handle)
  .put(new UpdateParabolicaController().handle)
  .delete(new DeleteParabolicaController().handle)

//Rotas para Receptor
router
  .route("/v1/receptor")
  .get(new GetReceptorController().handle)
  .post(new CreateReceptorControler().handle)
router
  .route("/v1/receptor/:id")
  .get(new FindReceptorController().handle)
  .put(new UpdateReceptorController().handle)
  .delete(new DeleteReceptorController().handle)


//Rotas para Switch
router
  .route("/v1/switch")
  .get(new GetSwitchController().handle)
  .post(new CreateSwitchControler().handle)
router
  .route("/v1/switch/:id")
  .get(new FindSwitchController().handle)
  .put(new UpdateSwitchController().handle)
  .delete(new DeleteSwitchController().handle)

//Rotas para Torre
router
  .route("/v1/torre")
  .get(new GetTorreController().handle)
  .post(new CreateTorreControler().handle)
router
  .route("/v1/torre/:id")
  .get(new FindTorreController().handle)
  .put(new UpdateTorreController().handle)
  .delete(new DeleteTorreController().handle)

//Rotas para Transmissor
router
  .route("/v1/transmissor")
  .get(new GetTransmissorController().handle)
  .post(new CreateTransmissorControler().handle)
router
  .route("/v1/transmissor/:id")
  .get(new FindTransmissorController().handle)
  .put(new UpdateTransmissorController().handle)
  .delete(new DeleteTransmissorController().handle)

//Rotas para Quadro
router
  .route("/v1/quadro")
  .get(new GetQuadroController().handle)
  .post(new CreateQuadroControler().handle)
router
  .route("/v1/quadro/:id")
  .get(new FindQuadroController().handle)
  .put(new UpdateQuadroController().handle)
  .delete(new DeleteQuadroController().handle)

//Rotas para Station
router
  .route("/v1/station")
  .get(new GetStationController().handle)
  .post(new CreateStationControler().handle)
router
  .route("/v1/station/:id")
  .get(new FindStationController().handle)
  .put(new UpdateStationController().handle)
  .delete(new DeleteStationController().handle)

//Rotas para Telemetria
router
  .route("/v1/telemetria")
  .get(new GetTelemetriaController().handle)
  .post(new CreateTelemetriaControler().handle)
router
  .route("/v1/telemetria/:id")
  .get(new FindTelemetriaController().handle)
  .put(new UpdateTelemetriaController().handle)
  .delete(new DeleteTelemetriaController().handle)

//Rotas para Tarefas
router
  .route("/v1/tarefas")
  .get(new GetTarefaController().handle)
  .post(new CreateTarefaControler().handle)
router
  .route("/v1/tarefas/:id")
  .get(new FindTarefaController().handle)
  .put(new UpdateTarefaController().handle)
  .delete(new DeleteTarefaController().handle)

//Rotas para Checklist
router
  .route("/v1/checklist")
  .get(new GetChecklistController().handle)
  .post(new CreateChecklistControler().handle)
router
  .route("/v1/checklist/:id")
  .get(new FindChecklistController().handle)
  .put(new UpdateChecklistController().handle)
  .delete(new DeleteChecklistController().handle)

//Rotas para All
router
  .route("/all")
  .get(new GetAllController().handle)

//Rotas para Authenticate
router
  .route("/auth")
  .post(new AuthController().authenticate)

// router.post("/tarefa", createTarefa)
// router.get("/tarefas", getAllTarefas)

router.post("/tipo-equipamento", createTipoEquipamento)
router.get("/tipo-equipamentos", getAllTipoEquipamentos)

// router.post("/checklist", createChecklist)
// router.get("/checklists", getAllChecklists)
