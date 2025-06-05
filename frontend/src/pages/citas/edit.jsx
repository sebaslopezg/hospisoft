import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export const CitasEdit = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const params = useParams()

    const dataPlaceholder = {
        descripcion: null,
    }

    const [dataCitas, setData] = useState("")
    useEffect(()=>{
        !dataCitas ? (
        data.getOne(params.id)
        .then((res) => {
          const dataSource = res.data.data
          console.log(dataSource)
          dataSource ? setData(dataSource) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataCitas])

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target
    
        const payload = {
            nombre: fields.nombre.value,
        }
    
        const response = data.updateOne(params.id, payload)
        response
        .then((res) => {
            console.log(res)
            res.data.status ? (
            notifications.show(res.data.msg, 
              {severity: 'success',autoHideDuration: 3000,})
            ) : (
              notifications.show(res.data.msg, 
              {severity: 'error',autoHideDuration: 3000,})
            )
        })
        .then(navigate('/citas'))
        .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
            {severity: 'error',autoHideDuration: 3000,})
        })
    }

    return <>
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker defaultValue={dayjs(dataCitas.fecha)} label="Fecha de la cita" name='fecha' />
              </DemoContainer>
            </LocalizationProvider>
            <TextField defaultValue={dataCitas.descripcion} multiline maxRows={4} required name="descripcion" label="Descripcion"/>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}