import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import dataAxios from './data.jsx'

export const MedicamentosEdit = () => {

  const params = useParams()
  const notifications = useNotifications();
  const navigate = useNavigate();

  const dataPlaceholder = {
    nombre:null,
    descripcion: null,
    existencia:null,
  }

  const [data, setData] = useState("")
  useEffect(()=>{
    !data ? getData() : ''      

  },[data])

  const getData = async() =>{
    await dataAxios.getOne(params.id)
    .then((res) => {
      const dataSource = res.data.data[0]
      dataSource ? setData(dataSource) : setData(dataPlaceholder)
    })
    .catch(error => console.log(error))
  }

  const getFromData = async(e) =>{
  e.preventDefault()
  let value = e.target

  const formData = {
    nombre: value.nombre.value,
    descripcion: value.descripcion.value,
    existencia: value.existencia.value,
  }

  let formImage = new FormData()
  formImage.append('file0', value.file0.files[0])
  formImage.append('id', params.id)

  await dataAxios.setImage(formImage)
  .then((res) =>{
    console.log(res)
    res.data.status ? (
      notifications.show(res.data.msg, 
        {severity: 'success',autoHideDuration: 3000,})
      ) : (
        notifications.show(res.data.msg, 
        {severity: 'error',autoHideDuration: 3000,})
      )
  })
  .then(navigate('/admin/medicamentos'))
  .catch((err) =>{
    notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
  })


  await dataAxios.updateOne(params.id, formData)
  .then((res) =>{
    console.log(res)
    res.data.status ? (
      notifications.show(res.data.msg, 
        {severity: 'success',autoHideDuration: 3000,})
      ) : (
        notifications.show(res.data.msg, 
        {severity: 'error',autoHideDuration: 3000,})
      )
  })
  .then(navigate('/admin/medicamentos'))
  .catch((err) =>{
    notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
  })
}

  return <>
    <form action="" onSubmit={getFromData}>
      <Box sx={{display: 'flex', flexDirection:'column'}}>
        <TextField required name="nombre" defaultValue={data.nombre} label="Nombre" slotProps={{inputLabel:{shrink:'true'}}}/>
        <TextField multiline maxRows={4} defaultValue={data.descripcion} required name="descripcion" label="Descripcion" slotProps={{inputLabel:{shrink:'true'}}}/>
        <TextField required type="number" defaultValue={data.existencia} name="existencia" label="Existencia" slotProps={{inputLabel:{shrink:'true'}}}/>
        <TextField type='file' name="file0" label="imagen" slotProps={{inputLabel:{shrink:'true'}}}/>
        <Box>
          <Button type="submit" variant="contained">Guardar</Button>
        </Box>
      </Box>
    </form>
  </>;
}

export default MedicamentosEdit