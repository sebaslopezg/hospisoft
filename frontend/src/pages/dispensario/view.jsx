import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from "react";
import data from './data'
import ExcelExportButton from '../../components/excelButton';

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
        })
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
            <ExcelExportButton rows={rows} columns={columns} fileName="reporte_dispensario" />
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