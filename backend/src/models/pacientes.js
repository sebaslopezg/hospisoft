import mongoose, { Schema } from 'mongoose'

const pacientesSchema = Schema({
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
    documento: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    edad:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    eps:{
        type:String,
        required:true
    },
    alergias:{
        type:String,
        required:true
    },
    grupoSanguineo:{
        type:String,
        enum:['A', 'B', 'AB', 'O',],
        required:true
    },
    rh:{
        type:String,
        enum:['positivo', 'negativo'],
        required:true
    },
    status:{
        type:Number,
        required:false,
        default:1,
    }
},
{Collection:"pacientes"}
)

const model = mongoose.model("pacientes", pacientesSchema)

export const schema = model.schema;
export default model;

/*


*/