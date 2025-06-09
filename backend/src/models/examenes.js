import mongoose, { Schema } from 'mongoose'

const examenSchema = Schema({
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
    medico:{
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
{Collection:"examenSchema"}
)

const model = mongoose.model("examenSchema", examenSchema)

export const schema = model.schema;
export default model;