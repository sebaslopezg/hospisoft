import express from 'express'
import * as medicamentos from '../controllers/medicamentos.js'

const router = express.Router()

router.get("/medicamento/view", medicamentos.view)
router.get("/medicamento/getbyid/:id", medicamentos.getbyid)
router.post("/medicamento/create", medicamentos.create)
router.put("/medicamento/updatebyid/:id", medicamentos.updatebyid)
router.delete("/medicamento/deletebyid/:id", medicamentos.deletebyid)

export default router


/**
 * 

/medicamento/view
/medicamento/getbyid/:id
/medicamento/create
/medicamento/updatebyid/:id
/medicamento/deletebyid/:id

 */