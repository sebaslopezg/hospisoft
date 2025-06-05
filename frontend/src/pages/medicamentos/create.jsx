import { useState } from "react"
import axios from "axios"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import Config from '../../Config';

export const MedicamentosCreate = () =>{ 

  const notifications = useNotifications();
  const navigate = useNavigate();

const [myData, setData] = useState({})

const getFromData = async(e) =>{
  e.preventDefault()
  let value = e.target

  const formData = {
    nombre: value.nombre.value,
    descripcion: value.descripcion.value,
    existencia: value.existencia.value,
  }
  setData(formData)
  await axios.post(`${Config('urlRoot')}/medicamento/create`,formData)
  .then((res) =>{
    res.data.status ? (
      notifications.show(res.data.msg, 
        {severity: 'success',autoHideDuration: 3000,})
      ) : (
        notifications.show(res.data.msg, 
        {severity: 'error',autoHideDuration: 3000,})
      )
  })
  .then(navigate('/medicamentos'))
  .catch((err) =>{
    notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
  })
}

    return <>
    <form action="" onSubmit={getFromData}>
      <Box sx={{display: 'flex', flexDirection:'column'}}>
        <TextField required name="nombre" label="Nombre"/>
        <TextField multiline maxRows={4} required name="descripcion" label="Descripcion"/>
        <TextField required type="number" name="existencia" label="Existencia"/>
        <Box>
          <Button type="submit" variant="contained">Guardar</Button>
        </Box>
      </Box>
    </form>
    </>;
}