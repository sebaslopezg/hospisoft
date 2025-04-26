import cita from '../models/citas.js'

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

    let data = {
        createdBy:req.body.createdBy,
        updatedBy:req.body.updatedBy,
        status:req.body.status,
        fecha:req.body.fecha,
        descripcion:req.body.descripcion,
        pacienteId:req.body.pacienteId
    }

    try {
        const citaNueva = new cita(data)
        await citaNueva.save()

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

/**
 * Función para seleccionar un dato por medio de su id
 * @constructor
 */
const getbyid = async(req, res) =>{
    let id = req.params.id

    try {
        let consulta = await cita.findOneAndDelete({_id: id}).exec()
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
        pacienteId:req.body.pacienteId
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