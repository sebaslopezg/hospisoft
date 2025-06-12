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

    let idMaestro
    let idMedicamento
    let maestro
    let medicamento

    try {
        idMaestro = mongoose.Types.ObjectId.createFromHexString(req.body.maestroId)
        idMedicamento = mongoose.Types.ObjectId.createFromHexString(req.body.medicamentoId)
        maestro = await pacientes.findOne({_id: idMaestro, status:{$gt:0}}).exec()
        medicamento = await formulas.findOne({_id: idMedicamento, status:{$gt:0}}).exec()
    } catch (error) {
        maestro = null
        medicamento = null
    }

    let data = {
        maestroId: req.body.maestroId,
        medicamentoId: req.body.medicamentoId,
        cantidad: req.body.cantidad,
    }

    try {
        if (maestro && medicamento) {
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