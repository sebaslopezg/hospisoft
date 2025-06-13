import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

export const UsuariosEdit = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const [rol, setRol] = useState('')
    const params = useParams()

    const handleChange = (e) => {
      setRol(e.target.value);
    };

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
          dataSource ? (setData(dataSource), setRol(dataSource.rol)) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataUser])

    const setSubmit = async(e) => {
        e.preventDefault()
        let fields = e.target
    
        const payload = {
            numDoc: fields.numDoc.value,
            nombre: fields.nombre.value,
            email: fields.email.value,
            password: fields.password.value,
            telefono: fields.telefono.value,
            direccion: fields.direccion.value,
            rol: fields.rol.value,
        }

        let formImage = new FormData()
        formImage.append('file0', fields.file0.files[0])
        formImage.append('id', params.id)
    
        await data.updateOne(params.id, payload)
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


        await data.createOneImage(formImage)
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
            <TextField defaultValue={dataUser.numDoc} required name="numDoc" label="Numero de Documento" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataUser.nombre} multiline maxRows={4} required name="nombre" label="Nombre" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataUser.email} required name="email" label="Email" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField  defaultValue={dataUser.password} type='password' required name="password" label="Contraseña"/>
            <TextField defaultValue={dataUser.telefono} required type="number" name="telefono" label="Telefono" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField defaultValue={dataUser.direccion} required name="direccion" label="Direccion" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField type='file' name="file0" label="imagen" slotProps={{inputLabel:{shrink:'true'}}}/>
            <FormControl>
            <InputLabel id="rolLabel">Rol</InputLabel>
            <Select
              labelId="rolLabel"
              value={rol}
              label="Rol"
              name='rol'
              onChange={handleChange}
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Medico</MenuItem>
              <MenuItem value={3}>Secretario</MenuItem>
              <MenuItem value={4}>Visitante</MenuItem>
            </Select>
            </FormControl>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}