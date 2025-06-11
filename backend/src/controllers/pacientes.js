import pacientes from '../models/pacientes.js'

const getAll = async(req, res)=>{
    try {
        let dataPayload = await pacientes.find({status:{$gt:0}}).exec()
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

    let data = {
        documento: req.body.documento,
        direccion: req.body.direccion,
        email: req.body.email,
        nombre: req.body.nombre,
        edad: req.body.edad,
        telefono: req.body.telefono,
        eps: req.body.eps,
        alergias: req.body.alergias,
        grupoSanguineo: req.body.grupoSanguineo,
        rh: req.body.rh,
        status: 1,
    }

    try {
        const newData = new pacientes(data)
        await newData.save()

        return res.send({
            status:true,
            msg:"Paciente creado"
        })
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
        let query = await pacientes.findOne({_id: id, status:{$gt:0}}).exec()
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

const getbyDocument = async(req, res) =>{

    let document = req.params.document

    try {
        let query = await pacientes.findOne({documento: document, status:{$gt:0}}).exec()
        if (query) {
            return res.send({
                status:true,
                msg:"Paciente encontrado",
                data:query
            })
        }else{
            return res.send({
                status:false,
                msg:"No se pudo encontrar el paciente",
            })
        }
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
        documento: req.body.documento,
        direccion: req.body.direccion,
        email: req.body.email,
        nombre: req.body.nombre,
        edad: req.body.edad,
        telefono: req.body.telefono,
        eps: req.body.eps,
        alergias: req.body.alergias,
        grupoSanguineo: req.body.grupoSanguineo,
        rh: req.body.rh,
    }

    try {
        let query = await pacientes.findByIdAndUpdate(id, data).exec()
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
        let query = await pacientes.findByIdAndUpdate(id, {status:0}).exec()
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
    getbyDocument,
}