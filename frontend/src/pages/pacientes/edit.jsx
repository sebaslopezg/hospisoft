import { InputLabel, Select, MenuItem, Button, TextField, Box } from '@mui/material';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

export const PacientesEdit = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const params = useParams()
    const [grupo, setGrupo] = useState(null)
    const [rh, setRh] = useState('') 

    const handleChangeGrupo = (e)=>{
      setGrupo((e.target.value))
    }

    const handleChangeRh = (e)=>{
      setRh((e.target.value))
    }


    const dataPlaceholder = {
        numDoc: null,
    }

    const [dataDefaultValue, setData] = useState("")
    useEffect(()=>{
        !dataDefaultValue ?      
         getDefaultData()
         : ''      
    },[dataDefaultValue])

    
    
    const getDefaultData = async()=>{
        await data.getOne(params.id)
        .then((res) => {
          const dataSource = res.data.data
          console.log(dataSource);
          dataSource ? (setData(dataSource), setGrupo(dataSource.grupoSanguineo), setRh(dataSource.rh)) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
    }

    

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
            grupoSanguineo: fields.grupoSanguineo.value,
            rh: fields.rh.value,
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
        .then(navigate('/admin/pacientes'))
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