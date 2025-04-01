import { Schema, model, Collection } from 'mongoose'

//Creamos el schema

const medicamentoSchema = Schema({
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
        max: 255,
    },
},
{Collection:"medicamento"}
)

module.exports = model("medicamento", medicamentoSchema)