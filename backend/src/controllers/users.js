import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path';
import user from "../models/users.js";

const view = async (req, res) => {
  try {
    let data = await user.find({status:{$gt:0}}).exec();
    res.status(200).send({
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      mensaje: "Error en la consulta",
    });
  }
}

const getOne = async (req, res) => {
  let id = req.params.id
  try {
    let data = await user.findOne({_id: id, status:{$gt:0}}).exec();
    res.status(200).send({
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      mensaje: "Error en la consulta",
    })
  }
}

//password: bcrypt.hashSync(req.body.password, 10),
const create = async (req, res) => {
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    telefono: req.body.telefono,
    rol: req.body.rol,
    direccion: req.body.direccion,
    numDoc: req.body.numDoc,
    status: req.body.status
  }
  
  let usuarioExiste = await user.findOne({ email: req.body.email, status:{$gt:0} });
  
  if (usuarioExiste) {
    return res.send({
      status: false,
      msg: "el usuario ya esta registrado en el sistema"
    });
  }
  try {
    let usuarioNuevo = new user(data);
    usuarioNuevo.save();
    res.send({
      status: true,
      msg: "usuario creado",
      data: usuarioNuevo
    });
  } catch (error) {
    res.send({
      status: false,
      msg: `usuario No creado ${error}`,
    });
  }
}

const updatebyid = async(req, res)=>{
  let id = req.params.id
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    telefono: req.body.telefono,
    rol: req.body.rol,
    direccion: req.body.direccion,
    numDoc: req.body.numDoc,
  }
  try {
    let query = await user.findByIdAndUpdate(id, data).exec()
    return res.send({
      status:true,
       msg:"Se ha actualizado el usuario de manera exitosa",
      data:query
    })
  }catch (error) {
    return res.send({
      status:false,
      msg:`Ha ocurrido un error el intentar actualizar el usuario ${error}`
    })
  }
}

const deletebyid = async(req, res)=>{
  let id = req.params.id
  try {
    let query = await user.findByIdAndUpdate(id,{status:0}).exec()
    return res.send({
      status:true,
      msg:"Eliminación exitosa",
      data:query
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

    const updatedUser = await user.findByIdAndUpdate(req.body.id, {
      imagen: filename,
    });

    return res.status(200).json({
      estado: true,
      user: updatedUser,
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

const login = async (req, res) => {
  const { email , password} = req.body
  let usuarioExiste = await user.findOne({email, status:{$gt:0}});
  if (!usuarioExiste) {
    return res.send({
      status: false,
      msg: "usuario no existe en la Bd !",
    })
  }

  if (
    usuarioExiste &&
    bcrypt.compareSync(password, usuarioExiste.password)
  ) {
    const token = jwt.sign(
      {
        userId: usuarioExiste.id,
        rol: usuarioExiste.rol,
      },
      "seCreTo",
      { expiresIn: "4h" } 
    )
    return res.send({
      status: true,
      msg: "ingreso exitoso al sistema",
      token,
    });
  } else {
    return res.send({
      status: false,
      msg: "Credenciales erroneas, intente de nuevo !",
    })
  }
}

const avatar = (req, res) => {
  const file = req.params.file;
  const filePath = "./src/uploads/usuarios/" + file;

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
  getOne,
  create,
  updatebyid,
  deletebyid,
  uploadImage,
  avatar,
  login,
};
  