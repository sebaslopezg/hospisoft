import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

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

const handleEditClick = (id) =>{
  console.log(id)
}
const handleDelete = () =>{

}

  let dataList = []

  const getData = () =>{
    axios({
      method: 'get',
      url: 'http://192.168.1.120:4000/api/medicamento/view',
      responseType: 'json'
    })
      .then(function (response) {
          const data = response.data.data
          dataList = data
      });
  }

  getData()


const medicamentoView = () => {

    return <>

    <Grid container direction="column" spacing={1}>
    <Grid
      size={3}
    >
      <IconButton aria-label="delete" size="large" onClick={getData}>
        <RefreshIcon />
      </IconButton>
      <Button variant="contained" href="medicamentos/create">Nuevo</Button>
    </Grid>
      <DataGrid
        rows={dataList}
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