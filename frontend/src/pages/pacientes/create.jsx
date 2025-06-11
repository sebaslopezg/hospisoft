import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

export const PacientesCreate = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const [grupo, setGrupo] = useState('')
    const [rh, setRh] = useState('') 

    const handleChangeGrupo = (e)=>{
      setGrupo((e.target.value))
    }

    const handleChangeRh = (e)=>{
      setRh((e.target.value))
    }

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target

        const payload = {
          documento: fields.documento.value,
          direccion: fields.direccion.value,
          email: fields.email.value,
          nombre: fields.nombre.value,
          edad: fields.edad.value,
          telefono: fields.telefono.value,
          eps: fields.eps.value,
          alergias: fields.alergias.value,
          grupoSanguineo: fields.grupoSanguineo.value,
          rh: fields.rh.value,
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
            <TextField required name="direccion" label="Direccion"/>
            <TextField required name="email" label="Correo electrónico" type='email' />
            <TextField required name="nombre" label="Nombre"/>
            <TextField required name="edad" label="Edad" type='number' />
            <TextField required name="telefono" label="Telefono" type='number' />
            <TextField required name="eps" label="EPS"/>
            <TextField required name="alergias" label="Alergias"/>
            <InputLabel id="grupoSanguineoLabel">Grupo sanguíneo</InputLabel>
            <Select
              labelId="grupoSanguineoLabel"
              value={grupo}
              label="Grupo naguineo"
              name='grupoSanguineo'
              onChange={handleChangeGrupo}
            >
              <MenuItem value={'A'}>A</MenuItem>
              <MenuItem value={'B'}>B</MenuItem>
              <MenuItem value={'AB'}>AB</MenuItem>
              <MenuItem value={'O'}>O</MenuItem>
            </Select>
            <InputLabel id="RHlabel">RH</InputLabel>
            <Select
              labelId="RHlabel"
              value={rh}
              label="RH"
              name='rh'
              onChange={handleChangeRh}
            >
              <MenuItem value={'positivo'}>Positivo</MenuItem>
              <MenuItem value={'negativo'}>Negativo</MenuItem>
            </Select>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}