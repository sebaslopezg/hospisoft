import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

export const FormulasEdit = () => {

    const notifications = useNotifications();
    const navigate = useNavigate();
    const params = useParams()

    const dataPlaceholder = {
        numDoc: null,
    }

    const [dataUser, setData] = useState("")
    useEffect(()=>{
        !dataUser ? (
        data.getOne(params.id)
        .then((res) => {
          const dataSource = res.data.data[0]
          dataSource ? setData(dataSource) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataUser])

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target
    
        const payload = {
            numDoc: fields.numDoc.value,
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
        .then(navigate('/formulas'))
        .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
            {severity: 'error',autoHideDuration: 3000,})
        })
    }

    return <>
        <form action="" onSubmit={setSubmit}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
            <TextField defaultValue={dataUser.numDoc} required name="numDoc" label="Numero de Documento"/>
            <Box sx={{mt:1}}>
            <Button type="submit" variant="contained">Guardar</Button>
            </Box>
        </Box>
        </form>
    </>;
}