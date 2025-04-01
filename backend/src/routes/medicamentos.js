import express from 'express'
const router = express.Router()

import * as medicamentos from '../controllers/medicamentos.js'

router.get("/medicamento/view", medicamentos.view)
router.get("/medicamento/getbyid/:id", medicamentos.getbyid)
router.post("/medicamento/create", medicamentos.create)
router.put("/medicamento/updatebyid/:id", medicamentos.updatebyid)
router.delete("/medicamento/deletebyid/:id", medicamentos.deletebyid)

export default router