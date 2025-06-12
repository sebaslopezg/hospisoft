import mongoose, { Schema } from 'mongoose'

const dispensarioDetalleSchema = Schema({
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
    maestroId:{
        type:Schema.Types.ObjectId,
        required: false,
        default:0
    },
    medicamentoId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'medicamento'
    },
    cantidad:{
        type:Number,
        required:true
    },
    nota:{
        type:String,
        required:false
    },
    status:{
        type:Number,
        required:false,
        default:1,
    }
},
{Collection:"dispensarioDetalleSchema"}
)

const model = mongoose.model("dispensarioDetalleSchema", dispensarioDetalleSchema)

export const schema = model.schema;
export default model;