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
    field: "actions",
    headerName: "Action",
    renderCell: (params) => {
      return <>
        <IconButton href={`/citas/edit/${params.id}`}><EditIcon /></IconButton>
        <IconButton onClick={(e) => handleDelete(params.id)}><DeleteIcon /></IconButton>
      </>
    }
  }
];

const getAll = () => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}/`,
        responseType: 'json'
    })
}

const getOne = (id) => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}//${id}`,
        responseType: 'json'
    })
}

const createOne = (payload) => {
    return axios({
        method: 'post',
        url: `${Config('urlRoot')}/`,
        data: payload,
        responseType: 'json'
    })
}

const updateOne = (id, payload) => {
    return axios({
        method: 'put',
        url: `${Config('urlRoot')}/${id}`,
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