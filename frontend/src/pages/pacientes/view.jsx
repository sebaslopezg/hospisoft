import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useDialogs } from '@toolpad/core/useDialogs';
import InfoIcon from '@mui/icons-material/Info';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { PacientesDetails } from './details';
import ExcelExportButton from '../../components/excelButton';

export const PacientesView = () => {

    const [open, setOpen] = useState(false);
    const [idPaciente, setIdPaciente] = useState('')

  const handleClickOpen = (e) => {
    setOpen(true);
    setIdPaciente(e)
    console.log(e);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

    const columns = [
        ...data.columns,
        {
            width: 150,
            field: "actions",
            headerName: "Action",
            renderCell: (params) => {
                return <>
                    <IconButton onClick={(e)=> handleClickOpen(params.id)}><InfoIcon /></IconButton>
                    <IconButton href={`/admin/pacientes/edit/${params.id}`}><EditIcon /></IconButton>
                    <IconButton onClick={(e) => handleDelete(params.id)}><DeleteIcon /></IconButton>
                </>
            }
        }
    ]

    const [rows, setRows] = useState([])
    const dialogs = useDialogs();
    const notifications = useNotifications();

    useEffect(()=>{
        getRows()
    },[])

    const getRows = () =>{
        const response = data.getAll()
        response.then((data) => {
            setRows(data.data.data)
        })
    }

        const handleDelete = async(id) => {
        const confirmed = await dialogs.confirm('¿Seguro que desea eliminar el registro?', {
          okText: 'Si',
          cancelText: 'No',
          title: 'Eliminar'
        });
        if (confirmed) {
            let res = data.deleteOne(id)
            res.then((response) => {
                response.data.status ? (
                notifications.show(response.data.msg, 
                {severity: 'success',autoHideDuration: 3000,}),
                getRows()
                ) : (
                notifications.show(response.data.msg, 
                {severity: 'error',autoHideDuration: 3000,})
                )
            })
            .catch((err) => console.log(err))
        } 
    }

    const dialogueDetails = ()=>{
        return<>
            
        </>
    }

    return <>
        <Grid container direction="column" spacing={1}>
        <Grid container direction='row' sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            }}>
            <IconButton size="large" onClick={getRows}>
            <RefreshIcon />
            </IconButton>
            <Button variant="contained" href="/admin/pacientes/create">Nuevo</Button>
            <ExcelExportButton rows={rows} columns={columns} fileName="reporte_pacientes" />
        </Grid>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 4,
                },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            />
        </Grid>
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogContent sx={{ overflow: 'visible' }}>
                <PacientesDetails idPaciente={idPaciente}/>
            </DialogContent >
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    </>;
}