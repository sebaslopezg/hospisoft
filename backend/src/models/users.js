const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    },

    createBy:{
        type: String,
        required:true,
    },
    updatedBy:{
        type: String,
        required:true,
    },
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      default: "",
    },
    numDoc: {
      type: String,
      default: "",
    },
    imagen: {
      type: String,
      default: "default.png",
    },
  },
  { collection: "usuarios" }
);

//cambio en el estilo de exportacion

const Usuario = new model("Usuario", userSchema);
module.exports = Usuario;
