import mongoose, { Schema } from 'mongoose'

const formulaDetalleSchema = Schema({
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
        type:Schema.Types.ObjectId,
        required: false,
        default:0
    },
    medicamentoId:{
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
{Collection:"formulaDetalle"}
)

const model = mongoose.model("formulaDetalle", formulaDetalleSchema)

export const schema = model.schema;
export default model;