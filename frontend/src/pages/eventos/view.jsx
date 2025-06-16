import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';

export default function EventosView(){
  const [dataPacientes, setDataPacientes] = useState([])
  const notifications = useNotifications();

  const getPacientes = ()=>{
    const response = data.getAllPacientes()
    response.then((res)=>{
        setDataPacientes(res.data.data)
    })
  }
  useEffect(()=>{
    getPacientes()
  },[])
  
  const setSubmit = (e)=>{
    e.preventDefault()

    let fields = e.target
    dataPacientes.map((item)=>{
      const payload={
        to: item.email,
        from: 'sebaslg96@gmail.com',
        subject: fields.subject.value,
        text: fields.text.value,
        html: fields.text.value,
      }
      try {
          data.sendMail(payload).then((res) => {
            console.log(res.data.msg);
            notifications.show(`se ha enviado el mensaje al paciente ${item.nombre}`, {
            severity: 'success',
            autoHideDuration: 3000,
      });
          })
      } catch (error) {
        console.log(error);
        notifications.show(error, {
        severity: 'error',
        autoHideDuration: 3000,
      });
      }
    })
  }
    return (
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <TextField required name="subject" label="Título de la campaña"/>
            <TextField required name="text" multiline rows={8} label="Contenido"/>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Enviar información</Button>
            </Box>
        </Box>
        </form>
    )


}
