import express from 'express'
import cors from 'cors'
import connection from './src/database/db.js'
import medicamentoRoute from './src/routes/medicamentos.js'
import usersRoute from './src/routes/users.js'
import citaRoute from './src/routes/citas.js'
import notaRoute from './src/routes/notas.js'
import pacientesRoute from './src/routes/pacientes.js'
import formulaMaestroRoute from './src/routes/formulaMaestro.js'
import formulaDetalleRoute from './src/routes/formulaDetalle.js'

const app = express()

app.use(cors())
app.use(express.json())
connection()

app.use('/api', medicamentoRoute)
app.use('/api', usersRoute)
app.use('/api', citaRoute)
app.use('/api', notaRoute)
app.use('/api', pacientesRoute)
app.use('/api', formulaMaestroRoute)
app.use('/api', formulaDetalleRoute)

const port = 4000
app.listen(port,()=>(
    console.log(`listen ${port}`)
))