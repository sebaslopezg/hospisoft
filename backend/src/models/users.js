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
        required:false,
    },
    updatedBy:{
        type: String,
        required:false,
    },
    status:{
      type:Number,
      required:true,
      min:0,
      max:2,
      default:1
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
      required: false,
    },
    telefono: {
      type: String,
      required: true,
    },
    rol: {
      type: Number,
      required: true,
      default:4,
      min:1,
      max:4,
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
