import express from 'express'
import cors from 'cors'
import connection from './src/database/db.js'
import authJwt from './src/middlewares/auth.js'
import dotenv from 'dotenv';

import medicamentoRoute from './src/routes/medicamentos.js'
import usersRoute from './src/routes/users.js'
import citaRoute from './src/routes/citas.js'
import notaRoute from './src/routes/notas.js'
import pacientesRoute from './src/routes/pacientes.js'
import formulaMaestroRoute from './src/routes/formulaMaestro.js'
import formulaDetalleRoute from './src/routes/formulaDetalle.js'
import diagnosticosRoute from './src/routes/diagnosticos.js'
import examenesRoute from './src/routes/examenes.js'
import historiaRoute from './src/routes/historia.js'
import dispensarioRoute from './src/routes/dispensario.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
connection()

//authJwt(app)
app.use('/api', medicamentoRoute)
app.use('/api', usersRoute)
app.use('/api', citaRoute)
app.use('/api', notaRoute)
app.use('/api', pacientesRoute)
app.use('/api', formulaMaestroRoute)
app.use('/api', formulaDetalleRoute)
app.use('/api', diagnosticosRoute)
app.use('/api', examenesRoute)
app.use('/api', historiaRoute)
app.use('/api', dispensarioRoute)

const port = process.env.PORT || 3000
app.listen(port,()=>(
    console.log(`listen ${port}`)
))