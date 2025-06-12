import dispensarioMaestro from '../models/dispensarioMaestro.js'
import formulaMaestro from '../models/formulaMaestro.js'
import  mongoose  from 'mongoose'

const getAll = async(req, res)=>{
    try {
        let dataPayload = await dispensarioMaestro.find({status:{$gt:0}})
        .populate({
            path:'formulaId',
            select:'numeroFormula medico descripcion'
        })
        .populate({
            path:'pacienteId',
            select:'documento nombre email direccion telefono'
        })
        .exec()
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

    let idFormula
    let formula
    let idPaciente
    try {
        idFormula = mongoose.Types.ObjectId.createFromHexString(req.body.formulaId)
        formula = await formulaMaestro.findOne({_id: idFormula, status:{$gt:0}})
        .exec()
        idPaciente = formula.pacienteId 
    } catch (error) {
        formula = null
    }

    let data = {
        formulaId: req.body.formulaId,
        pacienteId: idPaciente,
        totalUnidades: req.body.totalUnidades,
        totalMedicamentos: req.body.totalMedicamentos,
        nota: req.body.nota,
    }

    try {
        if (formula) {
            const newData = new dispensarioMaestro(data)
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
        let query = await dispensarioMaestro.findOne({_id: id, status:{$gt:0}})
        .populate({
            path:'formulaId',
            select:'numeroFormula medico descripcion'
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
        totalUnidades: req.body.totalUnidades,
        totalMedicamentos: req.body.totalMedicamentos,
        nota: req.body.nota,
    }

    try {
        let query = await dispensarioMaestro.findByIdAndUpdate(id, data).exec()
        return res.send({
            status:true,
            msg:"Se ha actualizado el registro de manera exitosa",
            data:query
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error el intentar actualizar el registro ${error}`
        })
    }
}

const deletebyid = async(req, res)=>{

    let id = req.params.id

    try {
        let query = await dispensarioMaestro.findByIdAndUpdate(id, {status:0}).exec()
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