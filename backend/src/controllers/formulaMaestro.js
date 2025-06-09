import formulaMaestro from '../models/formulaMaestro.js'
import pacientes from '../models/pacientes.js'
import medicos from '../models/users.js'
import  mongoose  from 'mongoose'

const getAll = async(req, res)=>{
    try {
        let dataPayload = await formulaMaestro.find({status:{$gt:0}})
        .populate('medico', 'nombre')
        .populate({
            path:'pacienteId',
            select:'nombre documento'
        })
        .exec()
        res.status(200).send({
            status:true,
            data:dataPayload
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:`Error en la consulta: ${error}`
        })
    }
}

const getMedicos = async(req, res)=>{
    try {
        let dataPayload = await medicos.find({status:{$gt:0}, rol:2}).select('nombre').exec()
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

const create = async(req, res)=>{

    let counter
    let idPaciente
    let paciente

    try {
        idPaciente = mongoose.Types.ObjectId.createFromHexString(req.body.pacienteId)
        paciente = await pacientes.findOne({_id: idPaciente, status:{$gt:0}}).exec()
    } catch (error) {
        paciente = null
    }

    const formulaCounter = await formulaMaestro.findOne().sort({ numeroFormula: -1 }).limit(1)
    formulaCounter ? counter = formulaCounter.numeroFormula : counter = 0

    let data = {
        pacienteId: idPaciente,
        medico: req.body.medicoId,
        descripcion: req.body.descripcion,
        numeroFormula: counter + 1,
    }

    try {
        if (paciente) {
            const newData = new formulaMaestro(data)
            await newData.save()

            return res.send({
                status:true,
                data:newData,
                msg:"Registro creado"
            })            
        }else{
            return res.send({
                status:false,
                msg:"Error: Paciente no válido"
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
        let query = await formulaMaestro.findOne({_id: id, status:{$gt:0}})
        .populate({
            path:'pacienteId',
        })
        .populate({
            path:'medico',
            select:'nombre'
        })
        .exec()
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
    }

    try {
        let query = await formulaMaestro.findByIdAndUpdate(id, data).exec()
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
        let query = await formulaMaestro.findByIdAndUpdate(id, {status:0}).exec()
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
    create,
    getbyid,
    updatebyid,
    deletebyid,
    getMedicos,
}