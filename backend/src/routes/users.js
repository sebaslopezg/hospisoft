import express from 'express'
import * as users from '../controllers/users.js'

const router = express.Router()


router.get("/users/view", users.view)
router.post("/users/create", users.create)
router.put("/users/updatebyid/:id", users.updatebyid)
router.delete("/users/deletebyid/:id", users.deletebyid)

export default router

/*
/users/view
/users/create
/users/updatebyid
/users/deletebyid/:id

*/