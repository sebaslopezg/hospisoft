import express from 'express'
import multer from 'multer'
import * as users from '../controllers/users.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/usuarios/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
})

const uploads = multer({ storage })

router.get("/users/view", users.view)
router.get("/users/getbyid/:id", users.getOne)
router.get("/users/getMedicos", users.getMedicos)
router.post("/users/create", users.create)
router.post("/users/login", users.login)
router.post(
  "/users/uploadimage",
  uploads.single("file0"),
  users.uploadImage
)
router.put("/users/updatebyid/:id", users.updatebyid)
router.delete("/users/deletebyid/:id", users.deletebyid)
router.get("/users/avatar/:file", users.avatar)

export default router