import formulas from './../models/formulaMaestro.js'
import diagnosticos from './../models/diagnosticos.js'
import examenes from './../models/examenes.js'
import paciente from './../models/pacientes.js'

const getById = async(req, res)=>{
    const id = req.params.id
    try {
        let pacienteData = await paciente.findOne({_id:id, status:{$gt:0}}).exec()
        let diagnosticosData = await diagnosticos.find({pacienteId:id, status:{$gt:0}}).exec()
        let examenesData = await examenes.find({pacienteId:id, status:{$gt:0}}).exec()
        let formulasData = await formulas.find({pacienteId:id, status:{$gt:0}}).exec()
        res.status(200).send({
            status:true,
            data:{
                paciente: pacienteData,
                diagnosticos: diagnosticosData,
                examenes: examenesData,
                formulas_m: formulasData
            }
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:"Error en la consulta"
        })
    }
}

export {getById}