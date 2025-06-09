import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config()

const connection = async()=>{
    try {
        await mongoose.connect(process.env.DB_HOST)
        console.log('OK conectado!!')
    } catch (error) {
        console.log(`error al intentar conectar con la Base de Datos: ${error}`)
    }    
}

export default connection