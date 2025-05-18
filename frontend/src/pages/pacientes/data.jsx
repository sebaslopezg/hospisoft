import axios from 'axios'
import Config from '../../Config';

  const columns = [
  {
    field: 'documento',
    headerName: 'Documento',
    type: 'text',
    width: 250,
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    type: 'text',
    width: 350,
  },
  {
    field: 'edad',
    headerName: 'Edad',
    type: 'text',
    width: 100,
  },
];

const getAll = () => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/pacientes/getall`,
      responseType: 'json'
    })
}

const getOne = (id) => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/pacientes/getbyid/${id}`,
      responseType: 'json'
    })
}

const createOne = (payload) => {
    return axios({
      method: 'post',
      url: `${Config('urlRoot')}/pacientes/create`,
      data: payload,
      responseType: 'json'
    })
}

const updateOne = (id, payload) => {
  return axios({
    method: 'put',
    url: `${Config('urlRoot')}/pacientes/updatebyid/${id}`,
    data: payload,
    responseType: 'json'
  })
}

const deleteOne = (id) => {
  return axios({
    method: 'delete',
    url: `${Config('urlRoot')}/pacientes/deletebyid/${id}`,
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