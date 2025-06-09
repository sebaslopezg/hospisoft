import mongoose, { Schema } from 'mongoose'

const diacnosticoSchema = Schema({
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
    pacienteId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'pacientes'
    },
    medicoId:{
        type:Schema.Types.ObjectId,
        ref:'user'
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
{Collection:"diacnosticoSchema"}
)

const model = mongoose.model("diacnosticoSchema", diacnosticoSchema)

export const schema = model.schema;
export default model;