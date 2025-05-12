import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import axios from 'axios'
import Config from '../../Config';


export const MedicamentosEdit = () => {

  const params = useParams()

  const dataPlaceholder = {
    nombre:null,
    descripcion: null,
    existencia:null,
  }

  const [data, setData] = useState([])
  useEffect(()=>{
    axios({
      method: 'get',
      url: `${Config('urlRoot')}/medicamento/getbyid/${params.id}`,
      responseType: 'json'
    })
    .then((res) => {
      const dataSource = res.data.data[0]
      dataSource ? setData(dataSource) : setData(dataPlaceholder)
    })
    .catch(error => console.log(error))
  },[data])

  //console.log(data)

  return <>
    <form action="" >
      <Box sx={{display: 'flex', flexDirection:'column'}}>
        <TextField margin="dense" required name="nombre" value={data.nombre} label="Nombre" variant="outlined" />
        <TextField multiline maxRows={4} margin="dense" value={data.descripcion} required name="descripcion" label="Descripcion" variant="outlined" />
        <TextField margin="dense" required type="number" value={data.existencia} name="existencia" label="Existencia" variant="outlined" />
        <Box>
          <Button type="submit" variant="contained">Guardar</Button>
        </Box>
      </Box>
    </form>
  </>;
}

export default MedicamentosEdit