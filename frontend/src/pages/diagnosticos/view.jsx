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


export const DiagnosticosView = () => {

    const columns = [
        ...data.columns,
        {
            field: "actions",
            headerName: "Action",
            renderCell: (params) => {
                return <>
                    <IconButton href={`/diagnosticos/edit/${params.id}`}><EditIcon /></IconButton>
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

    return <>
        <Grid container direction="column" spacing={1}>
        <Grid size={3}>
            <IconButton size="large" onClick={getRows}>
            <RefreshIcon />
            </IconButton>
            <Button variant="contained" href="/diagnosticos/create">Nuevo</Button>
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
    </>;
}