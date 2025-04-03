import express from 'express'
import * as citas from '../controllers/citas.js'

const router = express.Router()

router.get("/cita/view", citas.view)
router.get("/cita/getbyid/:id", citas.getbyid)
router.post("/cita/create", citas.create)
router.put("/cita/updatebyid/:id", citas.updatebyid)
router.delete("/cita/deletebyid/:id", citas.deletebyid)

export default router