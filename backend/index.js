import express from 'express'
import cors from 'cors'
import connection from './src/database/db.js'
import authJwt from './src/middlewares/auth.js'
import dotenv from 'dotenv';

import fs from "fs";
import https from "https";
import http from "http";
import path from "path";

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
import dispensarioMaestroRoute from './src/routes/dispensarioMaestro.js'
import dispensarioDetalleRoute from './src/routes/dispensarioDetalle.js'
import metricsRoute from './src/routes/metrics.js'
import messagesRoute from './src/routes/messages.js'

// Modificar

const hostIp = process.env.HOST_IP
const port = process.env.PORT || 3000
const httpPort = process.env.HTTP_PORT
const sslKeyPath = process.env.SSL_KEY_PATH
const sslCertPath = process.env.SSL_CERT_PATH

//Modificar

const app = express()
dotenv.config()

app.use(cors({
origin: ['https://reliable-hotteok-ca06f7.netlify.app/', 'http://localhost:4000'], // For local development as well
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Or whatever methods your API uses
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers you're sending
}))

app.use(express.json())


authJwt(app)
app.get("/", (req, res) => {
    res.send({ status: "ok", message: "API Hospisoft" });
});
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
app.use('/api', dispensarioMaestroRoute)
app.use('/api', dispensarioDetalleRoute)
app.use('/api', metricsRoute)
app.use('/api', messagesRoute)

const serverDevMode = async() =>{

    await connection()

    app.listen(port,()=>(
        console.log(`listen ${port}`)
    ))

}

const serverStart = async() =>{

    try {
        await connection()

        const keyPath = path.resolve(sslKeyPath)
        const certPath = path.resolve(sslCertPath)

        if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
            console.error(`Error: No se encontraron los archivos de certificado en:\n key: ${keyPath}\n cert: ${certPath}`);
            console.error("Genera tus archivos con OpenSSL o añadecertificados válidos.");
            process.exit(1);
        }

        const sslOptions = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        }

        const httpsServer = https.createServer(sslOptions, app)
        httpsServer.listen(port, '0.0.0.0')

        httpsServer.on('listening', () => {
            console.log(`Server HTTPS listening on https://${hostIp}:${port}`)
        })

        httpsServer.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Puerto ${port} ya está en uso. Cambia el
                valor de PORT en el código.`);
            } else {
                console.error('Error en servidor HTTPS:', err)
            }
            process.exit(1);
        })

        const httpServer = http.createServer(app)
        httpServer.listen(httpPort, '0.0.0.0')

        httpServer.on('listening', () => {
            console.log(`Servidor HTTP escuchando en http://${hostIp}:${httpPort}`);
        })

        httpServer.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Puerto ${httpPort} ya está en uso. Cambia el valor de HTTP_PORT en el código.`)
            } else {
                console.error('Error en servidor HTTP:', err)
            }
            process.exit(1)
        })
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1); 
    }
}

process.env.DEV_MODE ? serverDevMode() : serverStart()