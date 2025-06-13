import IconButton from '@mui/material/IconButton';
import { useNotifications } from '@toolpad/core/useNotifications';
import { Stack, TextField, Checkbox, ListItemText, ListItemIcon, ListItem, ListItemButton, List, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import data from './data'
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';

export const DispensarioView = () => {
    const [checked, setChecked] = useState([0]);
  
    const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
  
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
  
      setChecked(newChecked);
    };

    const notifications = useNotifications();
    const [numeroFormulaValue, setNumeroFormula] = useState('');
    const [formulaFound, setFormulaFound] = useState(false)
    const [rows, setRows] = useState([])

    const [entregar, setEntregar] = useState(0)
    const [entregarValue, setEntregarValue] = useState([])

  const handlerSetEntregarValue = (value, slot) => {
    let currentValue = entregarValue
    currentValue[slot] = value
    setEntregarValue(currentValue)
  }

  useEffect(()=>{
    handlerSetEntregarValue()
  },[entregarValue])


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
        ? <> <form>
        <Typography variant='h6' sx={{fontWeight:'bold'}}>Medicamentos</Typography>
    <List sx={{ width: '100%', maxWidth:'80%', bgcolor: 'background.paper' }}>
      {rows.map((item, index) => {
        const labelId = `checkbox-list-label-${item}`;

        return (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
              }}
            >
          <ListItem
            key={item}
            secondaryAction={
                <>
                </>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(item)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.medicamentoId.nombre} />
            </ListItemButton>
          </ListItem>
          <TextField 
          name='existencia'
          label='disponible' 
          disabled 
          variant='outlined' 
          size='small' 
          type='text' sx={{width:'40%'}} 
          value={item.medicamentoId.existencia} 
          slotProps={{
            inputLabel:{
              shrink:'true'
              }
            }}
          />
          <TextField 
          name='requerida'
          label='requerida' 
          disabled 
          variant='outlined' 
          size='small' 
          type='text' sx={{width:'40%'}} 
          value={item.cantidad} 
          slotProps={{
            inputLabel:{
              shrink:'true'
              }
            }}
          />
          <TextField 
          label='Entregar' 
          name='cantidad'
          variant='outlined' 
          size='small' 
          type='number' 
          sx={{width:'40%'}}
          value={entregarValue.index}
          onChange={(e)=>handlerSetEntregarValue(e.target.value, index)}
          inputProps={{
            min:0,
            max: item.medicamentoId.existencia && item.cantidad
          }}
          onKeyDown={(e)=>e.preventDefault()}
          disabled={!checked.includes(item)}
          slotProps={{
            inputLabel:{
              shrink:'true'
              }
            }}
          />
          <TextField 
          name='nota'
          label='Nota' 
          variant='outlined' 
          size='small' 
          type='text' sx={{width:'100%'}}  
          disabled={!checked.includes(item)}
          multiline
          />
          </Stack>
        );
      })}
    </List>
       </form> </>
        : <>
        </>}
    </>;
}