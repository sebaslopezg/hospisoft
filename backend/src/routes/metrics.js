import express from 'express'
import * as metrics from '../controllers/metrics.js'

const router = express.Router()

router.get("/metrics/getformulas", metrics.getFormulas)
router.get("/metrics/getpacientes", metrics.getPacientes)
router.get("/metrics/getdiagnosticos", metrics.getDiagnosticos)
router.get("/metrics/getexamenes", metrics.getExamenes)

export default router