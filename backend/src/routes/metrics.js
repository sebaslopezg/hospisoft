import express from 'express'
import * as metrics from '../controllers/metrics.js'

const router = express.Router()

router.get("/metrics/getformulas", metrics.getFormulas)
router.get("/metrics/getpacientes", metrics.getPacientes)
router.get("/metrics/getdiagnosticos", metrics.getDiagnosticos)
router.get("/metrics/getexamenes", metrics.getExamenes)
router.get("/metrics/getdispensario", metrics.getDispensario)
router.get("/metrics/getmedicos", metrics.getMedicos)

export default router