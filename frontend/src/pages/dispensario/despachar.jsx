import IconButton from '@mui/material/IconButton';
import { useNotifications } from '@toolpad/core/useNotifications';
import { Stack, TextField, Checkbox, ListItemText, ListItemIcon, ListItem, ListItemButton, List, Typography, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import data from './data'
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router";

export const DispensarioDespachar = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState([]);
    const [inputErrors, setInputErrors] = useState([])
    const handleToggle = (item) => () => {
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];
  
    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }
  
      setChecked(newChecked);
    };

    const notifications = useNotifications();
    const [numeroFormulaValue, setNumeroFormula] = useState('');
    const [formulaFound, setFormulaFound] = useState(false)
    const [rows, setRows] = useState([])
    const [formulaId, setFormulaId] = useState('')
    const [entregarValue, setEntregarValue] = useState([])
    const [notaValue, setNotaValue] = useState([])
    const [medicamentosFound, setMedicamentosFound] = useState([])

  const handlerSetEntregarValue = (value, slot) => {
    let currentValue = [...entregarValue]
    let currentErrors = [...inputErrors]
    let validCantidad = 0
    let requiredCantidad = 0

    

    if(formulaFound ){
      if(rows[slot] != undefined){
        validCantidad = rows[slot].medicamentoId.existencia 
        requiredCantidad = rows[slot].cantidad
      }
      
    if(validCantidad >= value){
      if(value <= requiredCantidad){
        currentErrors[slot] = false
      } else {
        currentErrors[slot] = true;
        notifications.show('Ingresó más de la cantidad requerida', 
        {severity: 'error',autoHideDuration: 3000,}) 
      }
    }else{
      currentErrors[slot] = true;
       notifications.show('No hay suficientes medicamentos', 
      {severity: 'error',autoHideDuration: 3000,}) 
    }
    setInputErrors(currentErrors);
    }
    currentValue[slot] = value
    setEntregarValue(currentValue) 
  }

    const handlerSetNotaValue = (value, slot) => {
    let currentValue = notaValue
    currentValue[slot] = value
    setNotaValue(currentValue)
  }

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
    const findMedicamentos = (data)=>{
      if (rows.length === 0) {
        
      } else{
        
      }
    }
    const getRows = async(numeroFormula) => {
      await data.getFormula(numeroFormula)
      .then((res) => {
      const data = res.data.data
      data != null ? (
        data != 0 ? (
          setFormulaId(data[0].formulaId),
          setFormulaFound(true),
          findMedicamentos(data),
          setRows(data),
          notifications.show(res.data.msg, 
          {severity: 'success',autoHideDuration: 3000,})
        ) : (
          notifications.show('Error: La formula no contiene medicamentos', 
          {severity: 'error',autoHideDuration: 3000,})
        )
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
      
      totales()
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

    const totales = ()=>{
      let totalEntregar = 0
      for (let i = 0; i < entregarValue.length; i++) {
        totalEntregar += parseInt(entregarValue[i])
      }
      console.log(checked.length);
      console.log(totalEntregar);
      
      
    }

    const setSubmit = (e)=>{
      
      e.preventDefault()
      const payload = {
      formulaId: formulaId,
      nota: notaValue[0],
      totalUnidades: totalUnidades,
      totalMedicamentos: totalEntregar,
      }

    const response = data.createOne(payload)
    let saveMedicamentoStatus
    response.then((res) => {
      res.data.status ? (
        saveMedicamentoStatus = saveMedicamentos(res.data.data._id),
        notifications.show(res.data.msg, 
        {severity: 'success',autoHideDuration: 3000,})
      ) : (
        notifications.show(res.data.msg, 
        {severity: 'error',autoHideDuration: 3000,})
      )
    })
    .then(navigate('/dispensario'))
    .catch((err) =>{
    notifications.show('Error de conexión: ' + err.message, 
      {severity: 'error',autoHideDuration: 3000,})
    })
    }

    const saveMedicamentos = (id) => {
    let responseStatus = false
    checked.forEach((item, index) => {
    const payload = {
      maestroId: id,
      medicamentoId: item.medicamentoId._id,
      cantidad: entregarValue[index],
      nota: notaValue[index],
    };
      const response = data.createDispensarioDetalle(payload)
      response.then((res) =>{
        res.data.status ? (
          responseStatus = true,
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
    })
    return responseStatus
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
        ? <> <form action="" onSubmit={setSubmit}>
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
                  mb:3,
                  justifyContent: "flex-start",
                  alignItems: "center",
              }}
            >
          <ListItem
            key={item}
            name='medicamentoId'
            value={item.medicamentoId._id}
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
          error={inputErrors[index] || false}
          label='Entregar' 
          name='cantidad'
          variant='outlined' 
          size='small' 
          type='number' 
          defaultValue={0}
          sx={{width:'40%'}}
          value={entregarValue[index]}
          onChange={(e)=>handlerSetEntregarValue(e.target.value, index)}
          inputProps={{
            min:1,
            max: item.medicamentoId.existencia || item.cantidad
          }}
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
          value={notaValue[index]}
          onChange={(e)=>handlerSetNotaValue(e.target.value, index)}
          />
          </Stack>
        );
      })}
    </List>
    <Button type='submit'>Despachar fórmula</Button>
       </form> 
       </>
        : <>
        </>}
    </>;
}