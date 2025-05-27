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

    console.log(dataDefaultValue)

    return <>
        <form action="">
        <Stack spacing={2}>
            <TextField 
                //defaultValue={dataDefaultValue.numeroFormula} 
                margin="dense" 
                label="Paciente" 
                variant="outlined" 
                slotProps={{
                    input:{
                        readOnly:true
                    }
                }}
            />
            <Stack spacing={2} direction="row">
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
                <TextField 
                    //defaultValue={dataDefaultValue.numeroFormula} 
                    margin="dense" 
                    label="Documento de identidad" 
                    variant="outlined" 
                    slotProps={{
                        input:{
                            readOnly:true
                        }
                    }}
                />
            </Stack>

            <TextField 
                //defaultValue={dataDefaultValue.numeroFormula} 
                margin="dense" 
                label="Medico" 
                variant="outlined" 
                slotProps={{
                    input:{
                        readOnly:true
                    }
                }}
            />
            <TextField 
                defaultValue={dataDefaultValue.descripcion} 
                margin="dense" 
                label="Detalles" 
                variant="outlined" 
                slotProps={{
                    input:{
                        readOnly:true
                    }
                }}
            />

            <Stack spacing={2} direction="row">
                <Button variant="contained">Editar</Button>
                <Button variant="contained">Eliminar</Button>
            </Stack>
        </Stack>        
        </form>
    </>;
}