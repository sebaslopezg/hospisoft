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
import Autocomplete from '@mui/material/Autocomplete';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const FormulasCreate = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const [medicoValue, setMedicoValue] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentosInputs, setMedicamentosInputs] = useState([]);

    useEffect(()=>{
      getAllMedicos()
      getMedicamentos()
    },[medicos])

    const getAllMedicos = () =>{
      const response = data.getMedicos()
      response.then((res) => {
        setMedicos(res.data.data)
      })
    }

    const getMedicamentos = () => {
      const response = data.getMedicamentos()
      response.then((res) => {
        const data = res.data.data
        const formatedData = data.map(row => {
          const {nombre, ...rest} = row
          return { label: nombre, ...rest };
        })
        setMedicamentos(formatedData)
      })
    }

    const handleMedicamentosInputs = () =>{
      let theKey = Date.now()
      const element = {
        id:theKey,
        component:<>
          <Stack direction="row" spacing={2} key={theKey} className='medicamentoInputs'>
            <Autocomplete
              name='medicamento'
              disablePortal
              options={medicamentos}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Medicamento" />}
            />
            <TextField 
              name='medicamentoDescripcion'
              margin="dense" 
              label="Descripcion"
              variant="outlined" 
            />
            <Tooltip title="Eliminar Medicamento">
              <IconButton data-key={theKey} onClick={handleDeleteInput} aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Stack>
        </>
      } 

      let inputs = []
      medicamentosInputs ? inputs = medicamentosInputs : ''
      inputs.push(element)
          
      setMedicamentosInputs(inputs)
    }

    const handleDeleteInput = (e) =>{
      
      const id = e.target.closest('button').dataset.key
      let index = medicamentosInputs.findIndex(el =>  el.id == id)
      let inputs = medicamentosInputs
      inputs.splice(index,1)
      setMedicamentosInputs(inputs)
    }

    const handleChange = (e) => {
      setMedicoValue(e.target.value);
    }

    const handleAdd = () => {

    }

    const setSubmit = (e) => {
      e.preventDefault()
      let fields = e.target

      console.log(medicamentosInputs)
      medicamentosInputs ? (
        medicamentosInputs.map(element => {
          let input = element.component
          console.log(input)
        })
      ) : ''

      /*
      const payload = {
        pacienteId: fields.pacienteId.value,
        medicoId: fields.medicoId.value,
        medico: fields.medicoId.value,
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

      */
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
              margin="dense" 
              required name="descripcion" 
              label="Descripción General" 
              variant="outlined" 
            />
            <Stack direction="row" spacing={2}>
              <Autocomplete
                className='medicamentos'
                disablePortal
                options={medicamentos}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Medicamento" />}
              />
              <TextField 
                margin="dense" 
                label="Descripcion"
                variant="outlined" 
              />
              <Tooltip title="Agregar Medicamento">
                <IconButton onClick={handleMedicamentosInputs} aria-label="delete" size="large">
                  <AddOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack spacing={2}>
              {medicamentosInputs ? (
                medicamentosInputs.map(input => input.component)
              ) : ''}
            </Stack>
            <Box>
              <Button type="submit" variant="contained">Guardar</Button>
            </Box>
          </Stack>
        </Box>
        </form>
    </>;
}