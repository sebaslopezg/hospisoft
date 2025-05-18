import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import data from './data'
import { useNotifications } from '@toolpad/core/useNotifications';
import { useDialogs } from '@toolpad/core/useDialogs';

export const FormulasView = () => {

    const columns = [
        ...data.columns,
        {
            field: "actions",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return <>
                    <IconButton href={`/formulas/details/${params.id}`}><InfoIcon /></IconButton>
                    <IconButton href={`/formulas/edit/${params.id}`}><EditIcon /></IconButton>
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
    </>;
}