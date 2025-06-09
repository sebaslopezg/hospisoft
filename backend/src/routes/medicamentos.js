import express from 'express'
import multer from 'multer'
import * as medicamentos from '../controllers/medicamentos.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/medicamentos/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
})

const uploads = multer({ storage })

router.get("/medicamento/view", medicamentos.view)
router.get("/medicamento/getlist", medicamentos.getList)
router.get("/medicamento/getbyid/:id", medicamentos.getbyid)
router.post("/medicamento/create", medicamentos.create)
router.post(
  "/medicamento/updateimage",
  uploads.single("file0"),
  medicamentos.uploadImage
)
router.put("/medicamento/updatebyid/:id", medicamentos.updatebyid)
router.delete("/medicamento/deletebyid/:id", medicamentos.deletebyid)
router.get("/medicamento/image/:file", medicamentos.getImage)

export default router


/**
 * 

/medicamento/view
/medicamento/getbyid/:id
/medicamento/create
/medicamento/updatebyid/:id
/medicamento/deletebyid/:id

 */