import express from 'express'
import * as diagnosticos from '../controllers/diagnosticos.js'

const router = express.Router()

router.get("/diagnosticos/getall", diagnosticos.getAll)
router.get("/diagnosticos/getbyid/:id", diagnosticos.getbyid)
router.post("/diagnosticos/create", diagnosticos.createOne)
router.put("/diagnosticos/updatebyid/:id", diagnosticos.updatebyid)
router.delete("/diagnosticos/deletebyid/:id", diagnosticos.deletebyid)

export default router