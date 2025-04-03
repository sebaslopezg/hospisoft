import mongoose, { Schema } from 'mongoose'

const userSchema = Schema({
  timestamps: {
    createdAt: {
        required:false,
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        required:false,
        type: Date,
        default: Date.now,
      }
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
  { collection: "user" });

//cambio en el estilo de exportacion

const model = mongoose.model("user", userSchema)

export const schema = model.schema;
export default model;
