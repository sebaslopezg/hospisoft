import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

export const PacientesEdit = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const params = useParams()

    const dataPlaceholder = {
        numDoc: null,
    }

    const [dataDefaultValue, setData] = useState("")
    useEffect(()=>{
        !dataDefaultValue ? (
        data.getOne(params.id)
        .then((res) => {
          const dataSource = res.data.data
          dataSource ? setData(dataSource) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataDefaultValue])

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target
    
        const payload = {
            nombre: fields.nombre.value,
            edad: fields.edad.value,
        }
    
        const response = data.updateOne(params.id, payload)
        response
        .then((res) => {
            res.data.status ? (
            notifications.show(res.data.msg, 
              {severity: 'success',autoHideDuration: 3000,})
            ) : (
              notifications.show(res.data.msg, 
              {severity: 'error',autoHideDuration: 3000,})
            )
        })
        .then(navigate('/pacientes'))
        .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
            {severity: 'error',autoHideDuration: 3000,})
        })
    }

    return <>
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <TextField defaultValue={dataDefaultValue.documento} required name="documento" label="Numero de Documento"/>
            <TextField defaultValue={dataDefaultValue.nombre} required name="nombre" label="Nombre"/>
            <TextField defaultValue={dataDefaultValue.edad} required name="edad" label="Edad" type='number'/>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}