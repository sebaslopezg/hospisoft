import examenes from './../models/examenes.js'
import  mongoose  from 'mongoose'
import pacientes from '../models/pacientes.js'
import medicos from '../models/users.js'

const getAll = async(req, res)=>{
    try {
        let dataPayload = await examenes.find({status:{$gt:0}}).exec()
        res.status(200).send({
            status:true,
            data:dataPayload
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

const createOne = async(req, res)=>{

    let idPaciente
    let idMedico
    let paciente
    let medico
    let formatDate = new Date(req.body.fecha_vencimiento)

    try {
        idPaciente = mongoose.Types.ObjectId.createFromHexString(req.body.pacienteId)
        idMedico = mongoose.Types.ObjectId.createFromHexString(req.body.medicoId)
        paciente = await pacientes.findOne({_id: idPaciente, status:{$gt:0}}).exec()
        medico = await medicos.findOne({_id: idMedico, status:{$gt:0}, rol:2}).exec()
    } catch (error) {
        paciente = null
        medico = null
    }

    let data = {
        pacienteId: req.body.pacienteId,
        medicoId: req.body.medicoId,
        descripcion: req.body.descripcion,
        fecha_vencimiento: formatDate,
        status: 1,
    }

    try {
        if (paciente && medico) {
            const newData = new examenes(data)
            await newData.save()

            return res.send({
                status:true,
                data:newData,
                msg:"Registro creado"
            })            
        }else{
            return res.send({
                status:false,
                msg:"Error: Paciente o medico no valido"
            }) 
        }
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error al intentar crear: ${error}`
        }) 
    }
}

const getbyid = async(req, res) =>{

    let id = req.params.id

    try {
        let query = await examenes.findOne({_id: id, status:{$gt:0}}).exec()
        return res.send({
            status:true,
            msg:"Consulta exitosa",
            data:query
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error en la consulta: ${error}`
        }) 
    }
}

const updatebyid = async(req, res)=>{
    let id = req.params.id

    let data = {
        pacienteId: req.body.pacienteId,
        medicoId: req.body.medicoId,
        descripcion: req.body.descripcion,
        fecha_vencimiento: req.body.fecha_vencimiento,
    }

    try {
        let query = await examenes.findByIdAndUpdate(id, data).exec()
        return res.send({
            status:true,
            msg:"Se ha actualizado la nota de manera exitosa",
            data:query
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error el intentar actualizar la nota ${error}`
        })
    }
}

const deletebyid = async(req, res)=>{

    let id = req.params.id

    try {
        let query = await examenes.findByIdAndUpdate(id, {status:0}).exec()
        return res.send({
            status:true,
            msg:"Eliminación exitosa",
            data:query
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Error al intentar eliminar ${error}`
        })
    }
}

export {
    getAll,
    createOne,
    getbyid,
    updatebyid,
    deletebyid,
}