import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';

export default function EventosView(){
  const [dataPacientes, getDataPacientes] = useState([])

  const getPacientes = ()=>{
    response = data.getAllPacientes()
    response.then((res)=>{
      console.log(res.data.data);
      
    })
  }
  useEffect(()=>{
    getPacientes()
  },[])
  
  const setSubmit = ()=>{

  }
    return (
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <TextField required name="subject" label="Título de la campaña"/>
            <TextField required name="html" multiline rows={8} label="Contenido"/>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Enviar información</Button>
            </Box>
        </Box>
        </form>
    )


}
