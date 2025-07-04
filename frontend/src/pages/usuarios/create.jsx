import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { Card } from '@mui/material';

export const UsuariosCreate = () => {

    const notifications = useNotifications()
    const navigate = useNavigate()
    const [rol, setRol] = useState('')
    const [idPost, setIdPost] = useState('')

    const handleChange = (e) => {
      setRol(e.target.value);
    };


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

        var idImageUser

        await data.createOne(payload)
        .then((res) => {
          console.log(res.data.data._id);
            setIdPost(res.data.data._id)
            idImageUser = res.data.data._id
            res.data.status ? (
            notifications.show(res.data.msg, 
              {severity: 'success',autoHideDuration: 3000,})
            ) : (
              notifications.show(res.data.msg, 
              {severity: 'error',autoHideDuration: 3000,})
            )
        })
        .then(navigate('/admin/usuarios'))
        .catch((err) =>{
        notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
        })
        console.log(idPost);
        
        let formImage = new FormData()
        formImage.append('file0', fields.file0.files[0])
        formImage.append('id', idImageUser)

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
        .then(navigate('/admin/usuarios'))
        .catch((err) =>{
        notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
        })
    }

    return <>
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
          <Stack spacing={2}>
            <TextField required name="numDoc" label="Numero de Documento"/>
            <TextField maxRows={4} required name="nombre" label="Nombre"/>
            <TextField required name="email" label="Email"/>
            <TextField type='password' required name="password" label="Contraseña"/>
            <TextField required type="number" name="telefono" label="Telefono"/>
            <TextField required name="direccion" label="Direccion"/>
            <TextField type='file' name="file0" label="imagen" slotProps={{inputLabel:{shrink:'true'}}}/>
            <TextField name="id" type='hidden' value={idPost}/>
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
              <MenuItem value={5}>Dispensario</MenuItem>
            </Select>
            </FormControl>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
          </Stack>
        </Box>
        </form>
    </>;
}