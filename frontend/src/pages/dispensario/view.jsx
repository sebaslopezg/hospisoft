import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useNotifications } from '@toolpad/core/useNotifications';
import { Button, Divider, Stack, TextField, Typography, Accordion, AccordionActions, AccordionSummary, AccordionDetails } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import data from './data'
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';

import RefreshIcon from '@mui/icons-material/Refresh';
import { useDialogs } from '@toolpad/core/useDialogs';

export const DispensarioView = () => {
    const notifications = useNotifications();
    const [numeroFormulaValue, setNumeroFormula] = useState('');
    const [formulaFound, setFormulaFound] = useState(false)
    const [rows, setRows] = useState([])

    const columns = [
    ...data.columns,
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

    const getRows = async(numeroFormula) => {
      await data.getFormula(numeroFormula)
      .then((res) => {
      const data = res.data.data
      console.log(data)
      data != null ? (
      setFormulaFound(true),
      setRows(res.data.data),
      
      notifications.show(res.data.msg, 
      {severity: 'success',autoHideDuration: 3000,})
      ) : (
      notifications.show('Formula no encontrada', 
      {severity: 'error',autoHideDuration: 3000,})
      )
      })
      .catch((err) =>{
      notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
      })
    }
    
    const handleSearchFormula = () => {
      getRows(numeroFormulaValue)
    }

    const handleNumeroFormulaValue = (value) =>{
    setNumeroFormula(value)
    }

    const handleEnter = (event)=>{
      if (event.key === 'Enter'){
        handleSearchFormula()
      }
    }

    return <>
       <Stack spacing={2} direction='row' sx={{mb:3}} >
          <TextField
            required 
            name="FormulaId" 
            label="Numero de la fórmula" 
            onChange={(e) => handleNumeroFormulaValue(e.target.value)}
            onKeyDown={handleEnter}
          />
          <Tooltip title="Buscar Usuario">
            <IconButton onClick={(e) => handleSearchFormula()} aria-label="delete" size="large">
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
        {formulaFound 
        ? <>
        <Grid container direction="column" spacing={1}>
        <Grid size={3}>
            <IconButton size="large" onClick={(e) => getRows(numeroFormulaValue)}>
            <RefreshIcon />
            </IconButton>
            <Button variant="contained" href="/formulas/create">Nuevo</Button>
        </Grid>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={rows}
            columns={columns}
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