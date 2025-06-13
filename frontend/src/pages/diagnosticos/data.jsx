import axios from 'axios'
import Config from '../../Config';

  const columns = [
  {
    field: 'pacienteId',
    headerName: 'Paciente',
    type: 'text',
    width: 200,
    valueGetter: (row) => {return row.nombre}
  },
  {
    field: 'medicoId',
    headerName: 'Médico',
    type: 'text',
    width: 200,
    valueGetter: (row) => {return row.nombre}
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    type: 'text',
    width: 400,
  },
];

const getAll = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/diagnosticos/getall`,
    responseType: 'json'
  })
}

const getOne = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/diagnosticos/getbyid/${id}`,
    responseType: 'json'
  })
}

const createOne = (payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/diagnosticos/create`,
    data: payload,
    responseType: 'json'
  })
}

const updateOne = (id, payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'put',
    url: `${Config('urlRoot')}/diagnosticos/updatebyid/${id}`,
    data: payload,
    responseType: 'json'
  })
}

const deleteOne = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'delete',
    url: `${Config('urlRoot')}/diagnosticos/deletebyid/${id}`,
    responseType: 'json'
  })
}

const getMedicos = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/users/getmedicos`,
    responseType: 'json'
  })
}

const getPacienteByDocument = (document) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/pacientes/getbydocument/${document}`,
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
  getMedicos,
  getPacienteByDocument
}