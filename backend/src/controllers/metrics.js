import formulas from '../models/formulaMaestro.js'
import formulasDetalle from '../models/formulaDetalle.js'
import pacientes from '../models/pacientes.js'
import diagnosticos from '../models/diagnosticos.js'
import examenes from '../models/examenes.js'
import dispensarioMaestro from '../models/dispensarioMaestro.js'
import dispensarioDetalle from '../models/dispensarioDetalle.js'

/**
 * medicamentos entregados (pendiente)
 */

const getPacientes = async(req, res)=>{
    try {
        let countTotal = await pacientes.countDocuments({})
        let countActive = await pacientes.countDocuments({status:{$gt:0}})
        let countDeleted = await pacientes.countDocuments({status:0})
        .exec()
        res.status(200).send({
            status:true,
            count:{
                total:countTotal,
                active:countActive,
                deleted:countDeleted,
            }
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

const getFormulas = async(req, res)=>{
    try {
        let countTotal = await formulas.countDocuments({})
        let countActive = await formulas.countDocuments({status:{$gt:0}})
        let countDeleted = await formulas.countDocuments({status:0})
        .exec()
        res.status(200).send({
            status:true,
            count:{
                total:countTotal,
                active:countActive,
                deleted:countDeleted,
            }
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

const getDiagnosticos = async(req, res)=>{
    try {
        let countTotal = await diagnosticos.countDocuments({})
        let countActive = await diagnosticos.countDocuments({status:{$gt:0}})
        let countDeleted = await diagnosticos.countDocuments({status:0})
        .exec()
        res.status(200).send({
            status:true,
            count:{
                total:countTotal,
                active:countActive,
                deleted:countDeleted,
            }
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

const getExamenes = async(req, res)=>{
    try {
        let countTotal = await examenes.countDocuments({})
        let countActive = await examenes.countDocuments({status:{$gt:0}})
        let countDeleted = await examenes.countDocuments({status:0})
        .exec()
        res.status(200).send({
            status:true,
            count:{
                total:countTotal,
                active:countActive,
                deleted:countDeleted,
            }
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

const getDispensario = async(req, res)=>{
    try {
        let countMaestro = await dispensarioMaestro.countDocuments({status:{$gt:0}})
        let countDetalle = await dispensarioDetalle.countDocuments({status:{$gt:0}})
        let countTotal = await dispensarioDetalle.aggregate([  
            { $match: { status:{$gt:0} } },          
            { $group: { _id: null, cantidad: {$sum: "$cantidad"} } }
        ])
        let countTotalFormulas = await formulasDetalle.aggregate([  
            { $match: { status:{$gt:0} } },          
            { $group: { _id: null, cantidad: {$sum: "$cantidad"} } }
        ])

        .exec()
        res.status(200).send({
            status:true,
            count:{
                maestro:countMaestro,
                detalle:countDetalle,
                totalEntregado:countTotal,
                totalFormulado:countTotalFormulas,
            },
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta" +error
        })
    }
}

export{
    getFormulas,
    getPacientes,
    getDiagnosticos,
    getExamenes,
    getDispensario
}