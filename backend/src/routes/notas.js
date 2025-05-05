import express from 'express'
import * as notas from '../controllers/notas.js'

const router = express.Router()

router.get("/notas/view", notas.view)
router.get("/notas/getbyid/:id", notas.getbyid)
router.post("/notas/create", notas.create)
router.put("/notas/updatebyid/:id", notas.updatebyid)
router.delete("/notas/deletebyid/:id", notas.deletebyid)

export default router