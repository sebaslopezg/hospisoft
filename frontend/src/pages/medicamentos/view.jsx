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

const medicamentoView = () => {

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
    medicamentoDelete.setDelete(id)
  }

  const columns = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    type: 'text',
    width: 110,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 300,
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