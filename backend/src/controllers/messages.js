import twilio from 'twilio'
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail'

dotenv.config()

const sendSMS = async(req, res)=>{

    const data = {
        body: req.body.body,
        to: req.body.to,
    }

    try {

        const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
        await client.messages
        .create({body:data.body, from:process.env.TWILIO_AUTH_TOKEN, to:data.to})
        .then(message => console.log(message))
        .catch(err => console.log(err))

        return res.send({
            status:true,
            msg:"Mensaje enviado!"
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error al intentar enviar el mensaje: ${error}`
        }) 
    }
}

const sendMail = async(req, res)=>{

    const data = {
        to: req.body.to,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
    }

    try {

        sgMail.setApiKey(process.env.SENDGRID_MAIL_API_KEY)
        const msg = {
            to: data.to,
            from: data.from,
            subject:data.subject,
            text:data.text,
            html: data.html
        }

        await sgMail.send(msg)

        return res.send({
            status:true,
            msg:"Mensaje enviado!"
        })
    } catch (error) {
        return res.send({
            status:false,
            msg:`Ha ocurrido un error al intentar enviar el mensaje: ${error}`
        }) 
    }
}

export {
    sendSMS,
    sendMail
}