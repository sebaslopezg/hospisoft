import mongoose, { Schema } from 'mongoose'

const dispensarioMaestroSchema = Schema({
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
    formulaId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'formulaMaestro'
    },
    pacienteId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref:'pacientes'
    },
    nota: {
        type: String,
        required: false,
        default:''
    },
    totalUnidades:{
        type: Number,
        required: false,
        default:0
    },
    totalMedicamentos:{
        type: Number,
        required: false,
        default:0
    },
    status:{
        type:Number,
        required:false,
        default:1,
    }
},
{Collection:"dispensarioMaestroSchema"}
)

const model = mongoose.model("dispensarioMaestroSchema", dispensarioMaestroSchema)

export const schema = model.schema;
export default model;