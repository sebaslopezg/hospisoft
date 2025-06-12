import express from 'express'
import * as dispensarioMaestro from '../controllers/dispensarioMaestro.js'

const router = express.Router()

router.get("/dispensario_m/getall", dispensarioMaestro.getAll)
router.get("/dispensario_m/getbyid/:id", dispensarioMaestro.getbyid)
router.post("/dispensario_m/create", dispensarioMaestro.createOne)
router.put("/dispensario_m/updatebyid/:id", dispensarioMaestro.updatebyid)
router.delete("/dispensario_m/deletebyid/:id", dispensarioMaestro.deletebyid)

export default router