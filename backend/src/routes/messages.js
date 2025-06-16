import express from 'express'
import * as messages from '../controllers/messages.js'

const router = express.Router()


router.post("/messages/sendmail", messages.sendMail)
router.post("/messages/sendsms", messages.sendSMS)


export default router