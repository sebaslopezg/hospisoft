import express from 'express'
import cors from 'cors'
import connection from '../database/db.js'

const app = express()

app.use(cors())
app.use(express.json())
connection()