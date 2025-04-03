import medicamento from '../models/medicamentos.js'

const view = async(req, res)=>{
    try {
        let listMedicamentos = await medicamento.find().exec()
        res.status(200).send({
            status:true,
            data:listMedicamentos
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

//pendiente agregar usuario id
const create = async(req, res)=>{

    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        existencia: req.body.existencia,
    }

    try {
        const medicamentoNuevo = new medicamento(data)
        await medicamentoNuevo.save()

        return res.send({
            status:true,
            msg:"Insercion exitosa"
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error en la consulta: ${error}`
        }) 
    }
}

const getbyid = async(req, res) =>{

    let id = req.params.id

    try {
        let consulta = await medicamento.find({_id: id}).exec()
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

const updatebyid = async(req, res)=>{
    let id = req.params.id

    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        existencia: req.body.existencia,
        status: req.body.status,
    }

    try {
        let consulta = await medicamento.findByIdAndUpdate(id, data).exec()
        return res.send({
            status:true,
            msg:"Se ha actualizado el medicamento de manera exitosa",
            data:consulta
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error el intentar actualizar el medicamento ${error}`
        })
    }
}

const deletebyid = async(req, res)=>{

    let id = req.params.id

    try {
        let consulta = await medicamento.findByIdAndUpdate(id, {status:0}).exec()
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