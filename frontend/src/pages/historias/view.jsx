import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useNotifications } from '@toolpad/core/useNotifications';
import { Divider, Stack, TextField, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import data from './data'
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';

export const HistoriasView = () => {
    const [rows, setRows] = useState([])
    const [diagnosticosRows, setDataDiagnosticosRows] = useState([])
    const [examenesRows, setExamenesRows] = useState([])
    const [formulasRows, setFormulasRows] = useState([])
    const notifications = useNotifications();
    const [documentoPacienteValue, setdocumentoPaciente] = useState([]);
    const [PacienteDataValue, setPacienteData] = useState([]);
    const [pacienteFound, setPacienteFound] = useState(false)

    const diagnosticosColumns = [
        ...data.diagnosticosColumns
    ]

    const ExamenesColumns = [
        ...data.ExamenesColumns
    ]

    const FormulasColumns = [
        ...data.FormulasColumns,
        {
            field: "actions",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return <>
                    <Tooltip title="Ver detalles">
                        <IconButton href={`/formulas/details/${params.id}`}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        }
    ]

     useEffect(()=>{
            getRows()
            console.log(rows);
            
        },[])
    
        const getRows = () =>{
            const response = data.getOne()
            response.then((data) => {
                const setData = data.data.data
                setRows(setData)
                setDataDiagnosticosRows(setData.diagnosticos)
                setExamenesRows(setData.examenes)
                setFormulasRows(setData.formulas_m)
            })
            
        }

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
    return <>
      <Stack spacing={2} direction='row'>
          <TextField
            required 
            name="pacienteId" 
            label="Documento del paciente" 
            onChange={(e) => handleDocumentoPacienteValue(e.target.value)}
          />
          <Tooltip title="Buscar Usuario">
            <IconButton onClick={(e) => handleSearchPerson()} aria-label="delete" size="large">
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
        {pacienteFound 
        ? <>
        <Grid container direction="column" spacing={1} sx={{mt:3, mb:3}}>
        <Stack direction="row"
            spacing={3}
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
            <Typography variant='h5'>Diagnosticos</Typography>
        </Stack>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={diagnosticosRows}
            columns={diagnosticosColumns}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 8,
                },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            />
        </Grid>

        <Divider/>

        <Grid container direction="column" spacing={1} sx={{mt:3, mb:3}}>
        <Stack direction="row"
            spacing={3}
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
            <Typography variant='h5'>Exámenes</Typography>
        </Stack>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={examenesRows}
            columns={ExamenesColumns}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 8,
                },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            />
        </Grid>

        <Divider/>
        
        <Grid container direction="column" spacing={1} sx={{mt:3, mb:3}}>
        <Stack direction="row"
            spacing={3}
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
            <Typography variant='h5'>Fórmulas</Typography>
        </Stack>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={formulasRows}
            columns={FormulasColumns}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 8,
                },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            />
        </Grid>
        </> 
        
        : <>
        
        </>}
        
    </>;
}