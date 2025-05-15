import axios from 'axios'
import Config from '../../Config';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import createHistory from 'history/createBrowserHistory'
import { NavigationUtils } from '../../routes/navigationUtils';

const history = createHistory();

  const columns = [
    {
      field: 'fecha',
      headerName: 'Fecha',
      type: 'text',
      width: 300,
    },
    {
      field: 'descripcion',
      headerName: 'Descripcion',
      type: 'text',
      width: 300,
    },
    {
    field: "actions",
    headerName: "Action",
    renderCell: (params) => {
      return <>
        <IconButton href={`/citas/edit/${params.id}`}><EditIcon /></IconButton>
        <IconButton onClick={(e) => deleteOne(params.id)}><DeleteIcon /></IconButton>
      </>
    }
  }
];

const getAll = () => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}/cita/view`,
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
        url: `${Config('urlRoot')}/cita/create`,
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

const deleteOne = async(id) => {
  await axios({
    method: 'delete',
    url: `${Config('urlRoot')}/cita/deletebyid/${id}`,
    responseType: 'json'
  })
  .then((response) => {
    response.data.status ? (
    notifications.show(response.data.msg, 
      {severity: 'success',autoHideDuration: 3000,})
    ) : (
      notifications.show(response.data.msg, 
      {severity: 'error',autoHideDuration: 3000,})
    )
  })
  .then(history.go(0))
  .catch((err) => console.log(err))
}

export default {
    columns,
    getAll,
    getOne,
    createOne,
    updateOne
}