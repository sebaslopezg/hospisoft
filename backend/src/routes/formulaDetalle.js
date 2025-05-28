import express from 'express'
import * as formulaDetalle from '../controllers/formulaDetalle.js'

const router = express.Router()

router.get("/formula_d/getall", formulaDetalle.getAll)
router.get("/formula_d/getbyid/:id", formulaDetalle.getbyid)
router.get("/formula_d/getByFormula/:formula", formulaDetalle.getByFormula)
router.post("/formula_d/create", formulaDetalle.create)
router.put("/formula_d/updatebyid/:id", formulaDetalle.updatebyid)
router.delete("/formula_d/deletebyid/:id", formulaDetalle.deletebyid)

export default router