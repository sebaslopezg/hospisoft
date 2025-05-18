import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";

export const FormulasCreate = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target

        const payload = {
          pacienteId: fields.pacienteId.value,
          medicoId: fields.medicoId.value,
          descripcion: fields.descripcion.value,
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
        .then(navigate('/formulas'))
        .catch((err) =>{
        notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
        })
    }

    return <>
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <TextField margin="dense" required name="pacienteId" label="Documento de identidad del paciente" variant="outlined" />
            <TextField margin="dense" required name="medicoId" label="Medico" variant="outlined" />
            <TextField margin="dense" required name="descripcion" label="Descripción General" variant="outlined" />
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}