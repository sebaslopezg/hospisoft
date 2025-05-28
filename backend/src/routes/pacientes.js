import express from 'express'
import * as pacientes from '../controllers/pacientes.js'

const router = express.Router()

router.get("/pacientes/getall", pacientes.getAll)
router.get("/pacientes/getbyid/:id", pacientes.getbyid)
router.get("/pacientes/getbydocument/:document", pacientes.getbyDocument)
router.post("/pacientes/create", pacientes.create)
router.put("/pacientes/updatebyid/:id", pacientes.updatebyid)
router.delete("/pacientes/deletebyid/:id", pacientes.deletebyid)

export default router