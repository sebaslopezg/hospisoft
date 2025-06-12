import { 
  DataGrid,
} from '@mui/x-data-grid';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from "react";
import Config from '../../Config';
import medicamentoDelete from './delete'

import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";

const medicamentoView = () => {

  const notifications = useNotifications();
  const [myData, setData] = useState([])


  useEffect(()=>{
    loadData()
  },[])

  const loadData = () =>{
    setData([])
    myData.length === 0 ? (
      console.log('carga desde el server'),
      axios.get(`${Config('urlRoot')}/medicamento/view`)
      .then((res) => {
        setData(res.data.data)
      })
      .catch(error => console.log(error))
    ) : ''
  }

  const handleDelete = (id) => {
    const setDelete = medicamentoDelete.setDelete(id)
    setDelete
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
    {
    field: 'imagen',
    headerName: 'Imagen',
    type: 'image',
    renderCell: (params) => <img width="100%" height="100%" src={`${Config('urlRoot')}/medicamento/image/${params.row.imagen}`}/>,
    width: 200,
    
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    type: 'text',
    width: 200,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 400,
  },
  {
    field: 'existencia',
    headerName: 'Existencia',
    width: 150,
    type:'number'
  },
  {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => {
      return <>
        <IconButton href={`/medicamentos/edit/${params.id}`}><EditIcon /></IconButton>
        <IconButton onClick={(e) => handleDelete(params.id)}><DeleteIcon /></IconButton>
      </>
    }
  }
];
  
  return <>

  <Grid container direction="column" spacing={1}>
  <Grid
    size={3}
  >
    <IconButton aria-label="delete" size="large" onClick={loadData}>
      <RefreshIcon />
    </IconButton>
    <Button variant="contained" href="medicamentos/create">Nuevo</Button>
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