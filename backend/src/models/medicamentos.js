import mongoose, { Schema } from 'mongoose'

//Creamos el schema

const medicamentoSchema = Schema({
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
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        default: "",
    },
    imagen: {
        type: String,
        default: "",
    },
    existencia: {
        type: Number,
        required: true,
        min: 0,
    },
},
{Collection:"medicamento"}
)

const model = mongoose.model("medicamento", medicamentoSchema)

export const schema = model.schema;
export default model;