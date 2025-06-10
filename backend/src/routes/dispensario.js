import express from 'express'
import * as dispensario from '../controllers/dispensario.js'

const router = express.Router()

router.get("/recibo/getall", dispensario.getAll)
router.get("/recibo/getbyid/:id", dispensario.getbyid)
router.post("/recibo/create", dispensario.createOne)
router.put("/recibo/updatebyid/:id", dispensario.updatebyid)
router.delete("/recibo/deletebyid/:id", dispensario.deletebyid)

export default router