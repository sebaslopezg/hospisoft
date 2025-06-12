import express from 'express'
import * as formulaMaestro from '../controllers/formulaMaestro.js'

const router = express.Router()

router.get("/formula_m/getall", formulaMaestro.getAll)
router.get("/formula_m/getmedicos", formulaMaestro.getMedicos)
router.get("/formula_m/getbyid/:id", formulaMaestro.getbyid)
router.get("/formula_m/getbynumero/:numero", formulaMaestro.getbyFormulaNumber)
router.post("/formula_m/create", formulaMaestro.create)
router.put("/formula_m/updatebyid/:id", formulaMaestro.updatebyid)
router.delete("/formula_m/deletebyid/:id", formulaMaestro.deletebyid)

export default router