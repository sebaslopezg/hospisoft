import mongoose from "mongoose"
import mongoUrl from "./config.js"

const connection = async()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log('OK conectado!!')
    } catch (error) {
        console.log(`error al intentar conectar con la Base de Datos: ${error}`)
    }    
}

export default connection