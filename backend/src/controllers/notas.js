import notas from './../models/notas.js'

const view = async(req, res)=>{
    try {
        let listNotas = await notas.find().exec()
        res.status(200).send({
            status:true,
            data:listNotas
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

const create = async(req, res)=>{

    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    }

    try {
        const newNota = new notas(data)
        await newNota.save()

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
        let query = await notas.find({_id: id}).exec()
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
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    }

    try {
        let query = await notas.findByIdAndUpdate(id, data).exec()
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
        let query = await notas.findByIdAndUpdate(id, {status:0}).exec()
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
    view,
    create,
    getbyid,
    updatebyid,
    deletebyid,
}