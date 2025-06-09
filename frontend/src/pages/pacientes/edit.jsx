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
            direccion: fields.direccion.value,
            email: fields.email.value,
            nombre: fields.nombre.value,
            edad: fields.edad.value,
            telefono: fields.telefono.value,
            eps: fields.eps.value,
            alergias: fields.alergias.value,
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
            <TextField defaultValue={dataDefaultValue.documento} disabled required name="documento" label="Numero de Documento" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataDefaultValue.direccion} required name="direccion" label="Direccion" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataDefaultValue.email} required name="email" label="Correo electrónico" type='email' slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataDefaultValue.nombre} required name="nombre" label="Nombre" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataDefaultValue.edad} required name="edad" label="Edad" type='number' slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataDefaultValue.telefono} required name="telefono" label="Telefono" type='number' slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataDefaultValue.eps} required name="eps" label="EPS" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataDefaultValue.alergias} required name="alergias" label="Alergias" slotProps={{inputLabel:{shrink:'true'}}}/>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}