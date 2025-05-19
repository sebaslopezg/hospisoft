import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useEffect, useState } from 'react';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";

import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'; 

export const FormulasCreate = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const [age, setAge] = useState('');
    const [medicos, setMedicos] = useState([]);

    useEffect(()=>{
      getAllMedicos()
    },[medicos])

    const getAllMedicos = () =>{
      const response = data.getMedicos()
      response.then((res) => {
        setMedicos(res.data.data)
      })
    }

    const handleChange = (e) => {
      setAge(e.target.value);
    };

    const handleAdd = () => {

    }

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
          <Stack spacing={2}>
            <TextField 
              margin="dense" 
              required name="pacienteId" 
              label="Documento de identidad del paciente" 
              variant="outlined" 
            />
            <FormControl>
            <InputLabel id="ageLabel">Medico</InputLabel>
            <Select
              labelId="ageLabel"
              value={age}
              label="medico"
              name='medicoId'
              onChange={handleChange}
            >
              {
                medicos ? (
                  medicos.map((medico) => {
                    return(
                      <MenuItem value={medico._id}>{medico.nombre}</MenuItem>
                    )
                  })
                ) : ''
              }
            </Select>
            </FormControl>
            <TextField 
              margin="dense" 
              required name="descripcion" 
              label="Descripción General" 
              variant="outlined" 
            />
            <Box>
              <Button type="submit" variant="contained">Guardar</Button>
            </Box>
          </Stack>
        </Box>
        </form>
    </>;
}