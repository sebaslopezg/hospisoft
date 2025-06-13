import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from "react";
import data from './data'

export const DispensarioView = () => {

    const columns = [
        ...data.columns,
    ]

    const [rows, setRows] = useState([])

    useEffect(()=>{
        getRows()
    },[])

    const getRows = () =>{
        const response = data.getAll()
        response.then((data) => {
            setRows(data.data.data)
            console.log(data.data.data);
            
        })
    }

    return <>
        <Grid container direction="column" spacing={1}>
        <Grid size={3}>
            <IconButton size="large" onClick={getRows}>
            <RefreshIcon />
            </IconButton>
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