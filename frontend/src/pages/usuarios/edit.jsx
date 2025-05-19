import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

export const UsuariosEdit = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const params = useParams()

    const dataPlaceholder = {
        numDoc: null,
        nombre: null,
        email: null,
        telefono: null,
        direccion:null,
    }

    const [dataUser, setData] = useState("")
    useEffect(()=>{
        !dataUser ? (
        data.getOne(params.id)
        .then((res) => {
          const dataSource = res.data.data
          dataSource ? setData(dataSource) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataUser])

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target
    
        const payload = {
            numDoc: fields.numDoc.value,
            nombre: fields.nombre.value,
            email: fields.email.value,
            telefono: fields.telefono.value,
            direccion: fields.direccion.value,
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
        .then(navigate('/usuarios'))
        .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
            {severity: 'error',autoHideDuration: 3000,})
        })
    }

    return <>
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <TextField defaultValue={dataUser.numDoc} margin="dense" required name="numDoc" label="Numero de Documento" variant="outlined" />
            <TextField defaultValue={dataUser.nombre} multiline maxRows={4} margin="dense" required name="nombre" label="Nombre" variant="outlined" />
            <TextField defaultValue={dataUser.email} margin="dense" required name="email" label="Email" variant="outlined" />
            <TextField defaultValue={dataUser.telefono} margin="dense" required type="number" name="telefono" label="Telefono" variant="outlined" />
            <TextField defaultValue={dataUser.direccion} margin="dense" required name="direccion" label="Direccion" variant="outlined" />
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}