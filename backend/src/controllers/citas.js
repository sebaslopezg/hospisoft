import cita from '../models/citas.js'
import  mongoose  from 'mongoose'
import pacientes from '../models/pacientes.js'
import medicos from '../models/users.js'

/**
 * Función para ver los datos en la tabla a la que pertenece la función 
 * @constructor
 */
const view = async(req, res)=>{
    try {
        let listCitas = await cita.find({status:{$gt:0}}).exec()
        res.status(200).send({
            status:true,
            data:listCitas
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

/**
 * Función para insertar datos en la tabla correspondiente
 * @constructor
 */
const create = async(req, res)=>{

    let formatDate = new Date(req.body.fecha)
    let idPaciente
    let idMedico
    let paciente
    let medico
    let displayError

    try {
        idPaciente = mongoose.Types.ObjectId.createFromHexString(req.body.pacienteId)
        idMedico = mongoose.Types.ObjectId.createFromHexString(req.body.medicoId)
        paciente = await pacientes.findOne({_id: idPaciente, status:{$gt:0}}).exec()
        medico = await medicos.findOne({_id: idMedico, status:{$gt:0}, rol:2}).exec()
        
    } catch (error) {
        paciente = null
        medico = null
        displayError = error 
    }

    let data = {
        createdBy:req.body.createdBy,
        updatedBy:req.body.updatedBy,
        status:1,
        fecha:formatDate,
        descripcion:req.body.descripcion,
        pacienteId:idPaciente,
        medicoId:idMedico
    }

    try {
        if (paciente && medico) {
            const newData = new cita(data)
            await newData.save()

            return res.send({
                status:true,
                data:newData,
                msg:"Registro creado"
            })            
        }else{
            return res.send({
                status:false,
                msg:`Error: Paciente o medico no valido: ${displayError}`
            }) 
        }
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error en la consulta: ${error}`
        }) 
    }
}

/**
 * Función para seleccionar un dato por medio de su id
 * @constructor
 */
const getbyid = async(req, res) =>{
    let id = req.params.id

    try {
        let consulta = await cita.findOne({_id: id, status:{$gt:0}}).exec()
        return res.send({
            status:true,
            msg:"Consulta exitosa",
            data:consulta
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error en la consulta: ${error}`
        }) 
    }
}

/**
 * Función para editar un dato por medio de su id
 * @constructor
 */
const updatebyid = async(req, res)=>{
    let id = req.params.id

    let data = {
        updatedBy:req.body.updatedBy,
        fecha:req.body.fecha,
        descripcion:req.body.descripcion,
        pacienteId:req.body.pacienteId,
        medicoId:req.body.medicoId
    }

    try {
        let consulta = await cita.findByIdAndUpdate(id, data).exec()
        return res.send({
            status:true,
            msg:"Se ha actualizado la cita de manera exitosa",
            data:consulta
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error el intentar actualizar la cita ${error}`
        })
    }
}

/**
 * Función para eliminar un dato por medio de su id
 * @constructor
 */
const deletebyid = async(req, res)=>{

    let id = req.params.id

    try {
        let consulta = await cita.findByIdAndUpdate(id, {status: 0}).exec()
        return res.send({
            status:true,
            msg:"Eliminación exitosa",
            data:consulta
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Error al intentar eliminar ${error}`
        })
    }

}

export {
    view,
    create,
    getbyid,
    updatebyid,
    deletebyid,
}