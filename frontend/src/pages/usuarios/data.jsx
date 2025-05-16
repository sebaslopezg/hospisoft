import axios from 'axios'
import Config from '../../Config';

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

export default {
  columns,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
}