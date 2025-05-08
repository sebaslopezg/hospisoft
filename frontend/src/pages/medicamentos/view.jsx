import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Config from '../../Config';


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
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      return (
      <>
        <IconButton onClick={handleEditClick(params.id)}><EditIcon /></IconButton>
        <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
      </>
    );
    }
  }
];

const handleDelete = () =>{
}

const handleEditClick = (id) =>{
  let navigate = useNavigate();
    navigate(`/medicamentos/edit/${id}`)
}

const medicamentoView = () => {

  const [myData, setData] = useState([])
  useEffect(()=>{
    axios
    .get(`${Config('urlRoot')}/medicamento/view`)
    .then((res) => {
      setData(res.data.data)
    })
    .catch(error => console.log(error))
  },[myData])
  
/*   let dataList = []
  
  const getData = () =>{
    axios({
      method: 'get',
      url: `${Config('urlRoot')}/medicamento/view`,
      responseType: 'json'
    })
    .then(function (response) {
        const data = response.data.data
        dataList = data
    });
  }
  
  getData() */

  return <>

  <Grid container direction="column" spacing={1}>
  <Grid
    size={3}
  >
    <IconButton aria-label="delete" size="large" onClick={setData}>
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