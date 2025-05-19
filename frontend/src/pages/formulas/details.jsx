import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

export const FormulasDetails = () => {

    const params = useParams()

    const dataPlaceholder = {
        numDoc: null,
    }

    const [dataDefaultValue, setData] = useState("")
    useEffect(()=>{
        !dataDefaultValue ? (
        data.getOne(params.id)
        .then((res) => {
          const dataSource = res.data.data
          dataSource ? setData(dataSource) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataDefaultValue])

    return <>
        <form action="">
        <Box 
            sx={{
                display: 'flex', 
                flexDirection:'column',
                '& .MuiTextField-root': { width: '20ch' }
            }}
        >
            <TextField 
                defaultValue={dataDefaultValue.numeroFormula} 
                margin="dense" 
                label="Numero de Formula" 
                variant="outlined" 
                slotProps={{
                    input:{
                        readOnly:true
                    }
                }}
            />
            <Box sx={{mt:1}}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained">Editar</Button>
                    <Button variant="contained">Eliminar</Button>
                </Stack>
            </Box>
        </Box>
        </form>
    </>;
}