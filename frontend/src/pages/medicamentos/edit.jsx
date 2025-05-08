import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { data, useParams } from 'react-router';
import axios from 'axios'


export const MedicamentosEdit = () => {

    const params = useParams()

    let dataContent = [] 
    const getData = () =>{
        axios({
          method: 'get',
          url: `http://192.168.1.120:4000/api/medicamento/getbyid/${params.id}`,
          responseType: 'json'
        })
        .then((res) => {
            const data = res
            dataContent = data
            console.log(data)
        })
      }

    getData()

    return <>
        <form action="" >
          <Box sx={{display: 'flex', flexDirection:'column'}}>
            <TextField margin="dense" required name="nombre" label="Nombre" variant="outlined" />
            <TextField multiline maxRows={4} margin="dense" required name="descripcion" label="Descripcion" variant="outlined" />
            <TextField margin="dense" required type="number" name="existencia" label="Existencia" variant="outlined" />
            <Box>
              <Button type="submit" variant="contained">Guardar</Button>
            </Box>
          </Box>
        </form>
    </>;
}

export default MedicamentosEdit