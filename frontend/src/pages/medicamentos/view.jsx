import { 
  DataGrid,
} from '@mui/x-data-grid';
import data from './data.jsx'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from "react";
import { useNotifications } from '@toolpad/core/useNotifications';
import ExcelExportButton from '../../components/excelButton';

const medicamentoView = () => {

  const notifications = useNotifications();
  const [myData, setData] = useState([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async() =>{
    setData([])
    myData.length === 0 ? (
      await data.getAll()
      .then((res) => {
        setData(res.data.data)
      })
      .catch(error => console.log(error))
    ) : ''
  }

  const handleDelete = async(id) => {
    await data.setDelete(id)
    .then((response) => {
      console.log(response)
      response.data.status ? (
      notifications.show(response.data.msg, 
        {severity: 'success',autoHideDuration: 3000,})
      ) : (
        notifications.show(response.data.msg, 
        {severity: 'error',autoHideDuration: 3000,})
      )
    })
    .then(loadData())
  }

  const columns = [
  ...data.columns,
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => {
      return <>
        <IconButton href={`/admin/medicamentos/edit/${params.id}`}><EditIcon /></IconButton>
        <IconButton onClick={(e) => handleDelete(params.id)}><DeleteIcon /></IconButton>
      </>
    }
  }
];
  
  return <>

  <Grid container direction="column" spacing={1}>
  <Grid container direction='row' sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            }}>
    <IconButton aria-label="delete" size="large" onClick={loadData}>
      <RefreshIcon />
    </IconButton>
    <Button variant="contained" href="/admin/medicamentos/create">Nuevo</Button>
    <ExcelExportButton rows={myData} columns={columns} fileName="reporte_medicamentos" />
  </Grid>
    <DataGrid
      rowHeight={100}
      rows={myData}
      getRowId={(dataList) => dataList._id}
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
  </>
}

export default medicamentoView