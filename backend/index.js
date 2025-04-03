import express from 'express'
import cors from 'cors'
import connection from './src/database/db.js'
import medicamentoRoute from './src/routes/medicamentos.js'
import usersRoute from './src/routes/users.js'

const app = express()

app.use(cors())
app.use(express.json())
connection()

app.use('/api', medicamentoRoute)
app.use('/api', usersRoute)
const port = 4000
app.listen(port,()=>(
    console.log(`listen ${port}`)
))