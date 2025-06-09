import axios from 'axios'
import Config from '../../Config';
import Chip from '@mui/material/Chip';

const roles = [
  {name:'sin rol', color:''},
  {name:'Administrador', color:'primary'},
  {name:'Medico', color:'success'},
  {name:'Secretario', color:'warning'},
  {name:'Visitante', color:''},
]

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
    field: 'rol',
    headerName: 'Rol',
    type: 'text',
    width: 200,
    renderCell: (params) => {
      console.log(params.row)
      return <>
        <Chip label={roles[params.row.rol].name} color={roles[params.row.rol].color} variant="outlined" />
      </>
    }
  },
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

const deleteOne = (id) => {
  return axios({
      method: 'delete',
      url: `${Config('urlRoot')}/users/deletebyid/${id}`,
      responseType: 'json'
  })
}

const createOneImage = (payload) => {
  return axios({
    method: 'post',
    url: `${Config('urlRoot')}/users/uploadimage`,
    data: payload,
    responseType: 'json'
  })
}

export default {
  columns,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  createOneImage
}