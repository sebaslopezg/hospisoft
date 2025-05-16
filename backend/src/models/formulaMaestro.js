import mongoose, { Schema } from 'mongoose'

const formulaMaestroSchema = Schema({
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
    createdBy:{
        type: String,
        required:false,
    },
    updatedBy:{
        type: String,
        required:false,
    },
    numeroFormula: {
        type: Number,
        required: false,
        default:0
    },
    pacienteId: {
        type: String,
        required: true,
    },
    medicoId:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:false
    },
    status:{
        type:Number,
        required:false,
        default:1,
    }
},
{Collection:"formulaMaestro"}
)

const model = mongoose.model("formulaMaestro", formulaMaestroSchema)

export const schema = model.schema;
export default model;