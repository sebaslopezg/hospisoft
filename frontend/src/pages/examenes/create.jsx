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
import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export const ExamenesCreate = () => {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const [medicoValue, setMedicoValue] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [documentoPacienteValue, setdocumentoPaciente] = useState([]);
  const [PacienteDataValue, setPacienteData] = useState([]);

  useEffect(()=>{
    getAllMedicos()
  },[medicos])

  const getAllMedicos = () =>{
    const response = data.getMedicos()
    response.then((res) => {
       res.data.rol
      setMedicos(res.data.data)
    })
  }

  const handleDocumentoPacienteValue = (value) =>{
    setdocumentoPaciente(value)
  }

  const handleSearchPerson = () => {
    const response = data.getPacienteByDocument(documentoPacienteValue)
    response.then((res) => {
      console.log(res.data)
      res.data.status ? (
        setPacienteData(res.data.data),
        notifications.show(res.data.msg, 
        {severity: 'success',autoHideDuration: 3000,})
      ) : (
        notifications.show(res.data.msg, 
        {severity: 'error',autoHideDuration: 3000,})
      )
    })
    .catch((err) =>{
    notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
    })
  }

  const handleChange = (e) => {
    setMedicoValue(e.target.value);
  }

  const setSubmit = (e) => {
    e.preventDefault()

    let fields = e.target

    const payload = {
      pacienteId: PacienteDataValue._id,
      medicoId: fields.medicoId.value,
      descripcion: fields.descripcion.value,
      fecha_vencimiento: fields.fecha.value
    }

    const response = data.createOne(payload)
    response.then((res) => {
      res.data.status ? (
        notifications.show(res.data.msg, 
        {severity: 'success',autoHideDuration: 3000,})
      ) : (
        notifications.show(res.data.msg, 
        {severity: 'error',autoHideDuration: 3000,})
      )
    })
    .then(navigate('/admin/ordenes/examenes'))
    .catch((err) =>{
    notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
    })
  }

    return <>
        <form action="" onSubmit={setSubmit}>
    <Box sx={{display: 'flex', flexDirection:'column'}}>
      <Stack spacing={2}>
        <Stack spacing={2} direction='row'>
          <TextField
            required 
            name="pacienteId" 
            label="Documento de identidad del paciente" 
            onChange={(e) => handleDocumentoPacienteValue(e.target.value)}
          />
          <Tooltip title="Buscar Usuario">
            <IconButton onClick={(e) => handleSearchPerson()} aria-label="delete" size="large">
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
        <FormControl>
        <InputLabel id="ageLabel">Medico</InputLabel>
        <Select
          labelId="ageLabel"
          value={medicoValue}
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
          required name="descripcion" 
          label="Descripción"  
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Fecha de vencimiento" name='fecha' />
          </DemoContainer>
        </LocalizationProvider>
        <Box>
          <Button type="submit" variant="contained">Guardar</Button>
        </Box>
      </Stack>
    </Box>
    </form>
    </>;
}