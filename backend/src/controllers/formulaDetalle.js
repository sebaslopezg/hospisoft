import formulaDetalle from '../models/formulaDetalle.js'

const getAll = async(req, res)=>{
    try {
        let dataPayload = await formulaDetalle.find({status:{$gt:0}}).exec()
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

const getByFormula = async(req, res)=>{
    let idFormula = req.params.formula
    try {
        let query = await formulaDetalle.find({formulaId: idFormula, status:{$gt:0}}).exec()
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

const create = async(req, res)=>{

    let data = {
        formulaId: req.body.formulaId,
        medicamentoId: req.body.medicamentoId,
        descripcion: req.body.descripcion,
    }

    try {
        const newData = new formulaDetalle(data)
        await newData.save()

        return res.send({
            status:true,
            msg:"Medicamento registrado"
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error al intentar registrar un medicamento: ${error}`
        }) 
    }
}

const getbyid = async(req, res) =>{

    let id = req.params.id

    try {
        let query = await formulaDetalle.findOne({_id: id, status:{$gt:0}}).exec()
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
        medicamentoId: req.body.medicamentoId,
        descripcion: req.body.descripcion,
    }

    try {
        let query = await formulaDetalle.findByIdAndUpdate(id, data).exec()
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
        let query = await formulaDetalle.findByIdAndUpdate(id, {status:0}).exec()
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
    getByFormula,
}