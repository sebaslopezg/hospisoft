import Usuario from "../models/users";

const view = async (req, res) => {
    try {
      let listUsers = await Usuario.find().exec();
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
  
    let usuarioExiste = await Usuarios.findOne({ email: req.body.email });
  
    if (usuarioExiste) {
      return res.send({
        estado: false,
        mensaje: "el usuario ya esta registrado en el sistema",
      });
    }
  
    try {
      let usuarioNuevo = new Usuario(data);
      usuarioNuevo.save();
      res.send({
        estado: true,
        mensaje: "usuario creado",
      });
    } catch (error) {
      res.send({
        estado: false,
        mensaje: "usuario No creado",
        error,
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
        let query = await Usuario.findByIdAndUpdate(id, data).exec()
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
          let query = await Usuario.findByIdAndDelete(id).exec()
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
    let usuarioExiste = await Usuario.findOne({ email: data });
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
  
  const uploadimg = async (req, res) => {
    try {
      // Validar si se subió un archivo
      if (!req.file) {
        return res.status(400).json({
          estado: false,
          mensaje: "No se ha subido ninguna imagen",
        });
      }
      // validar la extension de la imagen
      const { originalname, filename, path } = req.file;
      const extension = originalname.split(".").pop().toLowerCase();
      // Validar extensión de la imagen
      const extensionesValidas = ["png", "jpg", "jpeg", "webp"];
      if (!extensionesValidas.includes(extension)) {
        await fs.unlink(path);
        return res.status(400).json({
          estado: false,
          mensaje: "Extensión de archivo no permitida",
        });
      }
  
      const updateuserimg = await Usuario.findByIdAndUpdate(req.body.id, {
        imagen: filename,
      });
  
      return res.status(200).json({
        estado: true,
        user: usuarioActualizado,
      });
    } catch (error) {
      return res.status(500).json({
        estado: false,
        nensaje: "Error al procesar la imagen",
        error: error.message,
      });
    }
  };
  
  const avatar = (req, res) => {
    const file = req.params.file;
    const filePath = "./backend/src/uploads/users/" + file;
    fs.stat(filePath, (error, exists) => {
      if (!exists) {
        return res.status(404).send({
          status: "error",
          message: "No existe la imagen",
        });
      }
      return res.sendFile(path.resolve(filePath));
    });
  };
  module.exports = {
    view,
    create,
    updatebyid,
    deletebyid,
    login,
    uploadimg,
    avatar,
  };
  