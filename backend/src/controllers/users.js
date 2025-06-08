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
    let data = await user.findOne({_id: id}).exec();
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

//passwordHash: bcrypt.hashSync(req.body.password, 10),
const create = async (req, res) => {
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    telefono: req.body.telefono,
    rol: req.body.rol,
    direccion: req.body.direccion,
    numDoc: req.body.numDoc,
    status: req.body.status
  }
  
  let usuarioExiste = await user.findOne({ email: req.body.email });
  
  if (usuarioExiste) {
    return res.send({
      status: false,
      msg: "el usuario ya esta registrado en el sistema",
    });
  }
  try {
    let usuarioNuevo = new user(data);
    usuarioNuevo.save();
    res.send({
      status: true,
      msg: "usuario creado",
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
    //passwordHash: bcrypt.hashSync(req.body.password, 10),
    passwordHash: req.body.passwordHash,
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
    let query = await user.findByIdAndDelete(id).exec()
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

const login = async (req, res) => {
  let data = req.body.email;
  let usuarioExiste = await user.findOne({ email: data });
  if (!usuarioExiste) {
    return res.send({
      status: false,
      msg: "usuario no existe en la Bd !",
    })
  }
  if (
    usuarioExiste &&
    bcrypt.compareSync(req.body.password, usuarioExiste.passwordHash)
  ) {
    const token = jwt.sign(
      {
        userId: usuarioExiste.id,
        isAdmin: usuarioExiste.rol,
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

export {
  view,
  getOne,
  create,
  updatebyid,
  deletebyid,
  login,
};
  