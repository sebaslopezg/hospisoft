import axios from 'axios'
import Config from '../../Config';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

  const columns = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    type: 'text',
    width: 300,
  },
  {
    field: 'numDoc',
    headerName: 'Documento',
    type: 'text',
    width: 100,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'text',
    width: 250,
  },
  {
    field: 'telefono',
    headerName: 'Telefono',
    type: 'text',
    width: 100,
  },
  {
    field: 'direccion',
    headerName: 'Direccion',
    type: 'text',
    width: 200,
  },
    {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => {
      return <>
        <IconButton href={`/usuarios/edit/${params.id}`}><EditIcon /></IconButton>
        <IconButton onClick={(e) => handleDelete(params.id)}><DeleteIcon /></IconButton>
      </>
    }
  }
];

const getAll = () => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}/users/view`,
        responseType: 'json'
    })
}

const getOne = (id) => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}/users/getbyid/${id}`,
        responseType: 'json'
    })
}

const createOne = (payload) => {
    return axios({
        method: 'post',
        url: `${Config('urlRoot')}/users/create`,
        data: payload,
        responseType: 'json'
    })
}

const updateOne = (id, payload) => {
    return axios({
        method: 'put',
        url: `${Config('urlRoot')}/users/updatebyid/${id}`,
        data: payload,
        responseType: 'json'
    })
}

const DeleteOne = (id) => {
    console.log('DeleteOne')
}

export default {
    columns,
    getAll,
    getOne,
    createOne,
    updateOne,
    DeleteOne
}