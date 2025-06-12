import dispensario from '../models/dispensarioDetalle.js'
import formulas from '../models/formulaMaestro.js'
import pacientes from '../models/pacientes.js'
import  mongoose  from 'mongoose'

const getAll = async(req, res)=>{
    try {
        let dataPayload = await dispensario.find({status:{$gt:0}}).exec()
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
    let paciente
    let numeroFormula = req.body.numeroFormula
    let formula

    try {
        idPaciente = mongoose.Types.ObjectId.createFromHexString(req.body.pacienteId)
        paciente = await pacientes.findOne({_id: idPaciente, status:{$gt:0}}).exec()
        formula = await formulas.findOne({numeroFormula: numeroFormula, status:{$gt:0}, pacienteId:idPaciente}).exec()
    } catch (error) {
        paciente = null
        formula = null
    }

    let data = {
        formulaId: req.body.formulaId,
        pacienteId: req.body.pacienteId,
        nota: req.body.nota,
    }

    try {
        if (paciente && formula) {
            const newData = new dispensario(data)
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
        let query = await dispensario.findOne({_id: id, status:{$gt:0}})
        .populate({
            path:'formulaId',
            select:'numeroFormula nombre medico descripcion'
        })
        .populate({
            path:'pacienteId',
            select:'documento nombre email direccion telefono'
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
        nota: req.body.nota,
    }

    try {
        let query = await dispensario.findByIdAndUpdate(id, data).exec()
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
        let query = await dispensario.findByIdAndUpdate(id, {status:0}).exec()
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

export{
    getAll,
    createOne,
    getbyid,
    updatebyid,
    deletebyid,
}