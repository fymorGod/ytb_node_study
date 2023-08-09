import { Router } from "express";
import { createUser } from "./controllers/UserController";
import { createAccess, getAllAccesses } from "./controllers/AcessController";
import { createAntena, getAllAntenas } from "./controllers/AntenaController";
import { createTipoEquipamento, getAllTipoEquipamentos } from "./controllers/TipoEquipamentoController";
import { createTarefa, getAllTarefas } from "./controllers/TarefaController";
import { createChecklist, getAllChecklists } from "./controllers/ChecklistController";


export const router = Router()

router.post("/user", createUser)

router.post("/access", createAccess)
router.get("/accesses", getAllAccesses)

router.get("/antenas", getAllAntenas)
router.post("/antena", createAntena)

router.post("/tarefa", createTarefa)
router.get("/tarefas", getAllTarefas)

router.post("/tipo-equipamento", createTipoEquipamento)
router.get("/tipo-equipamentos", getAllTipoEquipamentos)

router.post("/checklist", createChecklist)
router.get("/checklists", getAllChecklists)