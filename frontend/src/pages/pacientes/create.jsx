import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";

export const PacientesCreate = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target

        const payload = {
          documento: fields.documento.value,
          nombre: fields.nombre.value,
          edad: fields.edad.value,
        }

        const response = data.createOne(payload)
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
            <TextField required name="documento" label="Numero de Documento"/>
            <TextField required name="nombre" label="Nombre"/>
            <TextField required name="edad" label="Edad" type='number' />
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}