import express from 'express'
import * as dispensarioDetalle from '../controllers/dispensarioDetalle.js'

const router = express.Router()

router.get("/dispensario_d/getall", dispensarioDetalle.getAll)
router.get("/dispensario_d/getbyid/:id", dispensarioDetalle.getbyid)
router.post("/dispensario_d/create", dispensarioDetalle.createOne)
router.put("/dispensario_d/updatebyid/:id", dispensarioDetalle.updatebyid)
//router.delete("/dispensario_d/deletebyid/:id", dispensarioDetalle.deletebyid)

export default router