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

export const FormulasEdit = () => {

    const [dataDefaultValue, setData] = useState("")
    const [pacienteValue, setPaciente] = useState({})
    const [medicamentos, setMedicamentos] = useState({})
 
    const notifications = useNotifications();
    const navigate = useNavigate();
    const params = useParams()

    const dataPlaceholder = {
        numDoc: null,
        medico:{nombre: ''}
    }

    useEffect(()=>{
        !dataDefaultValue ? (
        getFormulaDetails(params.id),
        data.getOne(params.id)
        .then((res) => {
            console.log(res)
            
            const dataSource = res.data.data
            dataSource ? (
            setData(dataSource),
            setPaciente(dataSource.pacienteId),
            console.log(dataSource)
            
        ) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataDefaultValue])

    const getFormulaDetails = (id) => {
        const response = data.getFormulaDetalle(id)
        response.then((res) => {setMedicamentos(res.data.data)
            console.log(res.data.data);
            
        })
    }

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
        <form action="">
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
            <TextField 
                defaultValue={null} 
                label="Medico" 
                slotProps={{
                    inputLabel:{
                        shrink:'true'
                    },
                }}
            />
            <TextField 
                defaultValue={dataDefaultValue.descripcion} 
                label="Detalles" 
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
                columns={data.MedicamentosDetails} 
                getRowId={(dataList) => dataList._id}
            />
        </Stack>        
        </form>
    </>
}