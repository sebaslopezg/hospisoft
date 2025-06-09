import { useState } from "react"
import axios from "axios"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import Config from '../../Config';
import { useEffect } from "react";

export const MedicamentosCreate = () =>{ 

  const notifications = useNotifications();
  const navigate = useNavigate();

const [myData, setData] = useState({})
const [imageInput, setImageInput] = useState(null)

useEffect(() => {
  imageInput ? '' : ''
},[imageInput])

const cargarImagen = (data) =>{
  setImageInput(data)
} 

const setImage = async(obj) => {
  let id = obj.data.data._id
  obj ? console.log(obj.data.data._id) : ''
  const form = new FormData()
  console.log(imageInput);
  
  const fileImage = imageInput.files[0]
  console.log(fileImage);
  
  form.append('file0',fileImage)
  form.append('id',id)
  await axios({
    method:'post',
    url:`${Config('urlRoot')}/medicamento/uploadimage`,
    data:form,
    headers: { "Content-Type": "multipart/form-data"}
  })
  .then((res) => console.log(res)
  )
  .catch((err) => console.log(err))
}

const getFromData = async(e) =>{
  e.preventDefault()
  let value = e.target

  setImageInput(value.imagen)
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
        setImage(res),
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

const fileHandler = (e) =>{

}

return <>
    <form action="" onSubmit={getFromData}>
      <Box sx={{display: 'flex', flexDirection:'column'}}>
        <TextField required name="nombre" label="Nombre"/>
        <TextField multiline maxRows={4} required name="descripcion" label="Descripcion"/>
        <TextField required type="number" name="existencia" label="Existencia"/>
        <TextField onChange={(e) => fileHandler(e)} type='file' name="imagen" label="Imagen" slotProps={{inputLabel:{shrink:'true'}}}/>
        <Box>
          <Button type="submit" variant="contained">Guardar</Button>
        </Box>
      </Box>
    </form>
    </>;
}