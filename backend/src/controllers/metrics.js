import  mongoose  from 'mongoose'
import formulas from '../models/formulaMaestro.js'
import pacientes from '../models/pacientes.js'
import diagnosticos from '../models/diagnosticos.js'
import examenes from '../models/examenes.js'

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

export{
    getFormulas,
    getPacientes,
    getDiagnosticos,
    getExamenes,
}