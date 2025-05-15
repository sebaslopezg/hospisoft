import mongoose, {Schema} from "mongoose";

const citasSchema = Schema({
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
    status:{
        type:Number,
        required:false,
        min:0,
        max:2,
        default:1
    },
    fecha:{
        type:Date,
        required:true,
    },
    descripcion: {
        type: String,
        default: "",
    },
    pacienteId:{
        type:String,
        required:true,
    }
},
{Collection:"citas"}
)

const model = mongoose.model("citas", citasSchema)

export const schema = model.schema
export default model