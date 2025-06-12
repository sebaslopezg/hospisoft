import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import { useDialogs } from '@toolpad/core/useDialogs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const FormulasEdit = () => {

    const defaultMedicoValue = {
        label:'',
        _id:''
    }

    const [dataDefaultValue, setData] = useState("")
    const [pacienteValue, setPaciente] = useState({})
    const [medicamentos, setMedicamentos] = useState({})
    const [medicamentoData, setMedicamentoData] = useState(null)
    const [medicos, setMedicos] = useState()
    const [medicoValue, setMedicoValue] = useState(defaultMedicoValue)
    const [open, setOpen] = useState(false);
 
    const dialogs = useDialogs();
    const notifications = useNotifications();
    const navigate = useNavigate();
    const params = useParams()

    const dataPlaceholder = {
        numDoc: null,
        medico:{nombre: ''}
    }

    const medicamentosColumns = [
        ...data.MedicamentosDetails,
        {
            field: "actions",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return <>
                    <Tooltip title="Editar">
                        <IconButton onClick={(e) => handlerEditMedicamento(params.id)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton onClick={(e) => handleDelete(params.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        }
    ]

    useEffect(()=>{
        !dataDefaultValue ? getDefaultValues() : ''
        !medicos ? getMedicos()  : ''    
    },[dataDefaultValue, medicos])

    const getDefaultValues = () => {
        getFormulaDetails(params.id),
        data.getOne(params.id)
        .then((res) => {
            const dataSource = res.data.data
            dataSource ? (
            setData(dataSource),
            setPaciente(dataSource.pacienteId),
            getMedicoDefault(dataSource.medico)
            ) : setData(dataPlaceholder)
        })
        .catch((error) => {
            notifications.show('Error: ' + error.message, 
            {severity: 'error',autoHideDuration: 3000,})
        })
    }

    const reload = () => {
        getFormulaDetails(params.id)
    }

    const getMedicos = () => {
        const defaultData = {
            label:'Sin datos',
            _id:'0'
        } 
        data.getMedicos()
        .then((res) => {
            const data = res.data.data
            const formatedData = data.map(row => {
                const {nombre, ...rest} = row
                return { label: nombre, ...rest };
            })
            
            data ? setMedicos(formatedData) : setMedicos(defaultData)
        })
        .catch((err) => {
            setMedicos(defaultData)
        })
    }


    const getMedicoDefault = (value) => {

        const defaultData = {
            label:value.nombre,
            _id:value._id
        } 
        
        setMedicoValue(defaultData)
    }

    const getFormulaDetails = (id) => {
        const response = data.getFormulaDetalle(id)
        response.then((res) => setMedicamentos(res.data.data))
    }

    const setSubmit = async(e) => {
        e.preventDefault()
        const fields = e.target
    
        const payload = {
            pacienteId: pacienteValue._id,
            medicoId: medicoValue._id,
            descripcion: fields.detalles.value,
        } 

        console.log(payload)
    
        await data.updateOne(params.id, payload)
        .then((res) => {
            res.data.status ? (
            notifications.show(res.data.msg, 
              {severity: 'success',autoHideDuration: 3000,})
            ) : (
              notifications.show(res.data.msg, 
              {severity: 'error',autoHideDuration: 3000,})
            )
        })
        //.then(navigate('/ordenes/formulas'))
        .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
            {severity: 'error',autoHideDuration: 3000,})
        })
    }

    const handlerMedicos = (e) =>{
        setMedicoValue(e)
    }
    
    const handlerEditMedicamento = async(id) => {
        setMedicamentoData(null)
        setOpen(true)
        await data.getOneDetalle(id)
        .then((response) => {
            const value = response.data.data
            setMedicamentoData(value)
        })
    }

    const handleDelete = async(id) => {
        const confirmed = await dialogs.confirm('¿Seguro que desea eliminar el medicamento?', {
          okText: 'Si',
          cancelText: 'No',
          title: 'Eliminar Medicamento'
        });
        if (confirmed) {
            let res = data.deleteMedicamento(id)
            res.then((response) => {
                response.data.status ? (
                notifications.show(response.data.msg, 
                {severity: 'success',autoHideDuration: 3000,}),
                reload()
                ) : (
                notifications.show(response.data.msg, 
                {severity: 'error',autoHideDuration: 3000,})
                )
            })
            .catch((err) => console.log(err))
        } 
    }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSaveDetails = async(e) => {
    e.preventDefault()
    const fields = e.target
    let payload = {
        dosificacion: fields.dosificacion.value,
        cantidad: fields.cantidad.value,
        descripcion: fields.descripcion.value
    }

    console.log(data)
    
    await data.updateOneDetalle(medicamentoData._id, payload)
    .then((response) => {
        response.data.status ? (
            notifications.show(response.data.msg, 
            {severity: 'success',autoHideDuration: 3000,}),
            setOpen(false),
            reload()
        ) : (
            notifications.show(response.data.msg, 
            {severity: 'error',autoHideDuration: 3000,})
        ) 
    })
    .catch((err) => {
        notifications.show('Error de conexión: ' + err.message, 
        {severity: 'error',autoHideDuration: 3000,})
    })
  }
  
    return <>

    <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (e) => {
                handleSaveDetails(e)
            },
          },
        }}
      >
        
        <DialogTitle>Editar Medicamento</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>

            <Stack spacing={2} direction="row">   
                
                <TextField 
                    defaultValue={medicamentoData ? medicamentoData.dosificacion : ''}
                    label="Dosificacion" 
                    name='dosificacion'
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                    }}
                />
                <TextField 
                    defaultValue={medicamentoData ? medicamentoData.cantidad : ''}
                    label="Cantidad" 
                    name='cantidad'
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                    }}
                />
                <TextField 
                    defaultValue={medicamentoData ? medicamentoData.descripcion : ''}
                    label="Descripcion" 
                    name='descripcion'
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                    }}
                />
            </Stack>
        </DialogContent>
            <DialogActions>
                <Button color='grey' onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Guardar</Button>
            </DialogActions>
            
    </Dialog>

    <form onSubmit={(e) => setSubmit(e)}>
        <Stack spacing={2}>
            <TextField 
                defaultValue={pacienteValue.nombre}
                disabled
                label="Paciente" 
                slotProps={{
                    inputLabel:{
                        shrink:'true'
                    },
                    input:{
                        readOnly:true
                    }
                }}
            />
            <Stack spacing={2} direction="row">
                <TextField 
                    disabled
                    defaultValue={dataDefaultValue.numeroFormula} 
                    label="Numero de Formula" 
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                        input:{
                            readOnly:true
                        }
                    }}
                />
                <TextField 
                    disabled
                    defaultValue={pacienteValue.documento} 
                    label="Documento de identidad" 
                    slotProps={{
                    inputLabel:{
                        shrink:'true'
                    },
                    input:{
                        readOnly:true
                    }
                }}
                />
            </Stack>
        <Stack
            direction="row"
            spacing={2}
        >
            <TextField 
                disabled
                defaultValue={pacienteValue.direccion} 
                label="Dirección" 
                slotProps={{
                    inputLabel:{
                        shrink:'true'
                    },
                    input:{
                        readOnly:true
                    }
                }}
            />

            <Stack spacing={2}>
                <TextField 
                    disabled
                    defaultValue={pacienteValue.email} 
                    label="Email" 
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                        input:{
                            readOnly:true
                        }
                    }}
                />
                </Stack>
                <TextField 
                    disabled
                    defaultValue={pacienteValue.edad} 
                    label="Edad" 
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                        input:{
                            readOnly:true
                        }
                    }}
                />
                <TextField 
                    disabled
                    defaultValue={pacienteValue.telefono} 
                    label="Telefono" 
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                        input:{
                            readOnly:true
                        }
                    }}
                />
                <TextField 
                    disabled
                    defaultValue={pacienteValue.eps} 
                    label="EPS" 
                    slotProps={{
                        inputLabel:{
                            shrink:'true'
                        },
                        input:{
                            readOnly:true
                        }
                    }}
                />
            </Stack>
            <TextField 
                disabled
                defaultValue={pacienteValue.alergias} 
                label="Alergias" 
                slotProps={{
                    inputLabel:{
                        shrink:'true'
                    },
                    input:{
                        readOnly:true
                    }
                }}
            />
{/*             <Autocomplete
                name='medico'
                onChange={(e, value) => {
                handlerMedicos(value, 0)
                }}
                disablePortal
                options={medicos}
                value={medicoValue}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} disabled label="Medico" />}
            /> */}
            <TextField defaultValue={medicoValue.label} disabled label="Medico" />
            <TextField 
                defaultValue={dataDefaultValue.descripcion} 
                label="Detalles"
                name='detalles' 
                slotProps={{
                    inputLabel:{
                        shrink:'true'
                    },
                }}
            />
            <Stack direction='row'>
            </Stack>
            <DataGrid
                rows={medicamentos} 
                columns={medicamentosColumns} 
                getRowId={(dataList) => dataList._id}
            />
            <Stack direction='row'>
                <Button type="submit" variant="contained">Guardar</Button>
            </Stack>      
        </Stack>  
    </form>
    </>
}