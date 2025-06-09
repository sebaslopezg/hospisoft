import medicamento from '../models/medicamentos.js'
import fs from 'fs'
import path from 'path';
/**
 * Función para ver los medicamentos disponibles
 * @constructor
 */
const view = async(req, res)=>{
    try {
        let listMedicamentos = await medicamento.find({status:{$gt:0}}).exec()
        res.status(200).send({
            status:true,
            data:listMedicamentos
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

const getList = async(req, res)=>{
    try {
        let listMedicamentos = await medicamento.find({status:{$gt:0}})
        .select('_id, nombre')
        .exec()
        res.status(200).send({
            status:true,
            data:listMedicamentos
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

/**
 * Función para crear medicamentos
 * @constructor
 */
//pendiente agregar usuario id
const create = async(req, res)=>{

    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        existencia: req.body.existencia,
    }

    try {
        const medicamentoNuevo = new medicamento(data)
        await medicamentoNuevo.save()

        return res.send({
            status:true,
            data: medicamentoNuevo,
            msg:"Insercion exitosa"
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error en la consulta: ${error}`
        }) 
    }
}

/**
 * Función para obtener un medicamento por medio de su id
 * @constructor
 */
const getbyid = async(req, res) =>{

    let id = req.params.id

    try {
        let consulta = await medicamento.find({_id: id, status:{$gt:0}}).exec()
        return res.send({
            status:true,
            msg:"Consulta exitosa",
            data:consulta
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error en la consulta: ${error}`
        }) 
    }
}


/**
 * Función para editar un medicamento por medio de su id
 * @constructor
 */
const updatebyid = async(req, res)=>{
    let id = req.params.id

    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        existencia: req.body.existencia,
        status: req.body.status,
    }

    try {
        let consulta = await medicamento.findByIdAndUpdate(id, data).exec()
        return res.send({
            status:true,
            msg:"Se ha actualizado el medicamento de manera exitosa",
            data:consulta
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error el intentar actualizar el medicamento ${error}`
        })
    }
}

/**
 * Función para eliminar un medicamento por medio de su id
 * @constructor
 */
const deletebyid = async(req, res)=>{

    let id = req.params.id

    try {
        let consulta = await medicamento.findByIdAndUpdate(id, {status:0}).exec()
        return res.send({
            status:true,
            msg:"Eliminación exitosa",
            data:consulta
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Error al intentar eliminar ${error}`
        })
    }

}

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        estado: false,
        mensaje: "No se ha subido ninguna imagen",
      })
    } 

    const { originalname, filename, path: filePath } = req.file;
    const extension = originalname.split(".").pop().toLowerCase();

    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if (!validExtensions.includes(extension)) {
      await fs.promises.unlink(filePath)
      return res.status(400).json({
        estado: false,
        mensaje: "Extensión de archivo no permitida",
      })
    }

    const updatedData = await medicamento.findByIdAndUpdate(req.body.id, {
      imagen: filename,
    });

    return res.status(200).json({
      estado: true,
      data: updatedData,
      //file: req.file,
    });

  }catch (error) {
      return res.status(500).json({
      estado: false,
      nensaje: "Error al procesar la imagen",
      error: error.message,
    });
  }
}

const getImage = (req, res) => {
  const file = req.params.file;
  const filePath = "./src/uploads/medicamentos/" + file;

  fs.stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "No existe la imagen",
      });
    }
    return res.sendFile(path.resolve(filePath));
  })
}

export {
    view,
    create,
    getbyid,
    updatebyid,
    deletebyid,
    getList,
    uploadImage,
    getImage
}