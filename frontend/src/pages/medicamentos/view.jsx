import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
      console.log(params)
      return (
        <>
      <IconButton ><EditIcon /></IconButton>
      <IconButton ><DeleteIcon /></IconButton>
        </>
    );
    }
  }
];

  let dataList = []

  axios({
    method: 'get',
    url: 'http://localhost:4000/api/medicamento/view',
    responseType: 'json'
  })
    .then(function (response) {
        const data = response.data.data
        dataList = data
    });

const medicamentoView = () => {

    return <>

    <Grid container direction="column" spacing={1}>
    <Grid
      size={1}
    >
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