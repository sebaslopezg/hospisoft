import express from 'express'
import * as examenes from '../controllers/examenes.js'

const router = express.Router()

router.get("/examenes/getall", examenes.getAll)
router.get("/examenes/getbyid/:id", examenes.getbyid)
router.post("/examenes/create", examenes.createOne)
router.put("/examenes/updatebyid/:id", examenes.updatebyid)
router.delete("/examenes/deletebyid/:id", examenes.deletebyid)

export default router