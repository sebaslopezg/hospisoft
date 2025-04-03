import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import user from "../models/users.js";

const view = async (req, res) => {
    try {
      let listUsers = await user.find().exec();
      res.status(200).send({
        exito: true,
        listUsers,
      });
    } catch (error) {
      res.status(500).send({
        exito: false,
        mensaje: "Error en la consulta",
      });
    }
  };
  
  const create = async (req, res) => {
    let data = {
      nombre: req.body.nombre,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      telefono: req.body.telefono,
      rol: req.body.esadmin,
      direccion: req.body.direccion,
      numDoc: req.body.zip,
    };
  
    let usuarioExiste = await user.findOne({ email: req.body.email });
  
    if (usuarioExiste) {
      return res.send({
        estado: false,
        mensaje: "el usuario ya esta registrado en el sistema",
      });
    }
  
    try {
      let usuarioNuevo = new user(data);
      usuarioNuevo.save();
      res.send({
        estado: true,
        mensaje: "usuario creado",
      });
    } catch (error) {
      res.send({
        estado: false,
        mensaje: `usuario No creado ${error}`,
      });
    }
  };

  const updatebyid = async(req, res)=>{
    let id = req.params.id
    let data = {
        nombre: req.body.nombre,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        telefono: req.body.telefono,
        rol: req.body.esadmin,
        direccion: req.body.direccion,
        numDoc: req.body.zip,
      };

      try {
        let query = await user.findByIdAndUpdate(id, data).exec()
        return res.send({
        status:true,
         msg:"Se ha actualizado el medicamento de manera exitosa",
        data:query
        })
          } catch (error) {
              return res.send({
                status:false,
                msg:`Ha ocurrido un error el intentar actualizar el medicamento ${error}`
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
        estado: false,
        mensaje: "usuario no existe en la Bd !",
      });
    }
  
    if (
      usuarioExiste &&
      bcrypt.compareSync(req.body.password, usuarioExiste.passwordHash)
    ) {
      const token = jwt.sign(
        {
          userId: usuarioExiste.id,
          isAdmin: usuarioExiste.esAdmin,
        },
        "seCreTo",
        { expiresIn: "4h" }
      );
  
      return res.send({
        estado: true,
        mensaje: "ingreso exitoso al sistema",
        token,
      });
    } else {
      return res.send({
        estado: false,
        mensaje: "Credenciales erroneas, intente de nuevo !",
      });
    }
  };

  export {
    view,
    create,
    updatebyid,
    deletebyid,
    login,
  };
  