import { Router } from "express";
import { createUser } from "./controllers/UserController";
import { createAccess, getAllAccesses } from "./controllers/AcessController";
import { createAntena } from "./controllers/AntenaController";
import { createTipoEquipamento, getAllTipoEquipamentos } from "./controllers/TipoEquipamentoController";


export const router = Router()

router.post("/user", createUser)

router.post("/access", createAccess)
router.post("/antena", createAntena)
router.post("/tipo-equipamento", createTipoEquipamento)
router.get("/accesses", getAllAccesses)
router.get("/tipo-equipamentos", getAllTipoEquipamentos)
