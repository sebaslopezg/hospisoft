import express from 'express'
import * as historia from '../controllers/historia.js'

const router = express.Router()

router.get("/historia/getbyid/:id", historia.getById)

export default router