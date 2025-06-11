import mongoose, { Schema } from 'mongoose'

const dispensarioSchema = Schema({
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
        ref:'formulaMaestro',
        default:0
    },
    formulaId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'formulaMaestro'
    },
    pacienteId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'pacientes'
    },
    nota: {
        type: String,
        required: false,
        default:''
    },
    status:{
        type:Number,
        required:false,
        default:1,
    }
},
{Collection:"dispensarioSchema"}
)

const model = mongoose.model("dispensarioSchema", dispensarioSchema)

export const schema = model.schema;
export default model;