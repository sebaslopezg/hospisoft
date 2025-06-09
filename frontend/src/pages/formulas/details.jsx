import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import data from './data'
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';

export const FormulasDetails = () => {

    const params = useParams()

    const dataPlaceholder = {
        numDoc: null,
    }

    const [dataDefaultValue, setData] = useState("")
    const [pacienteValue, setPaciente] = useState()
    const [documentoValue, setDocumento] = useState()
    const [medicoValue, setMedico] = useState()
    const [rows, setRows] = useState()

    useEffect(()=>{
        !dataDefaultValue ? (
        getFormulaDetails(params.id),
        data.getOne(params.id)
        .then((res) => {
          const dataSource = res.data.data
          dataSource ? (
            setData(dataSource),
            setPaciente(dataSource.pacienteId.nombre),
            setDocumento(dataSource.pacienteId.documento),
            setMedico(dataSource.medico.nombre)
        ) : setData(dataPlaceholder)
        })
        .catch(error => console.log(error))
        ) : ''      
    },[dataDefaultValue])

    const getFormulaDetails = (id) => {
        const response = data.getFormulaDetalle(id)
        response.then((res) => {setRows(res.data.data)
            console.log(res.data.data);
            
        })
    }

    return <>
        <form action="">
        <Stack spacing={2}>
            <TextField 
                defaultValue={pacienteValue} 
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
                    defaultValue={documentoValue} 
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

            <TextField 
                defaultValue={medicoValue} 
                label="Medico" 
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
                defaultValue={dataDefaultValue.descripcion} 
                label="Detalles" 
                slotProps={{
                    inputLabel:{
                        shrink:'true'
                    },
                    input:{
                        readOnly:true
                    }
                }}
            />
            <DataGrid
                rows={rows} 
                columns={data.MedicamentosDetails} 
                getRowId={(dataList) => dataList._id}
            />
        </Stack>        
        </form>
    </>;
}