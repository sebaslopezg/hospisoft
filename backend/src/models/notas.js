import mongoose, { Schema } from 'mongoose'

const notasSchema = Schema({
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
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        default: "",
    },
},
{Collection:"notas"}
)

const model = mongoose.model("notas", notasSchema)

export const schema = model.schema;
export default model;