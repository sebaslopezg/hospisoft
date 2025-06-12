import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useNotifications } from '@toolpad/core/useNotifications';
import { Button, Divider, Stack, TextField, Typography, Accordion, AccordionActions, AccordionSummary, AccordionDetails } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useParams } from 'react-router';
import data from './data'
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';

export const DispensarioView = () => {
/*     const notifications = useNotifications();
    const [documentoPacienteValue, setdocumentoPaciente] = useState([]);
    const [PacienteDataValue, setPacienteData] = useState([]);
    const [pacienteFound, setPacienteFound] = useState(false)
    const params = useParams()

     useEffect(()=>{
            pacienteFound ? '' : '' 
            
        },[PacienteDataValue])
    

          const handleSearchPerson = () => {
            const response = data.getPacienteByDocument(documentoPacienteValue)
            response.then((res) => {
              console.log(res.data)
              res.data.status ? (
                setPacienteFound(true),
                setPacienteData(res.data.data),
                notifications.show(res.data.msg, 
                {severity: 'success',autoHideDuration: 3000,})
                
              ) : (
                notifications.show(res.data.msg, 
                {severity: 'error',autoHideDuration: 3000,})
              )
            })
            .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
              {severity: 'error',autoHideDuration: 3000,})
            })
          }

    const handleDocumentoPacienteValue = (value) =>{
    setdocumentoPaciente(value)
    }

    const handleEnter = (event)=>{
      if (event.key === 'Enter'){
        handleSearchPerson()
      }
    } */

    return <>
      {/* <Stack spacing={2} direction='row' sx={{mb:3}} >
          <TextField
            required 
            name="pacienteId" 
            label="Documento del paciente" 
            onChange={(e) => handleDocumentoPacienteValue(e.target.value)}
            onKeyDown={handleEnter}
          />
          <Tooltip title="Buscar Usuario">
            <IconButton onClick={(e) => handleSearchPerson()} aria-label="delete" size="large">
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
        {pacienteFound 
        ? <>
        
        </>
        
        : <>
        
        </>}
         */}
    </>;
}