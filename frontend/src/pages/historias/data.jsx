import axios from 'axios'
import Config from '../../Config';

  const columns = [
  {
    field: 'pacienteId',
    headerName: 'ID del paciente',
    type: 'text',
    width: 200,
  },
  {
    field: 'medicoId',
    headerName: 'ID del médico',
    type: 'text',
    width: 200,
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
      method: 'get',
      url: `${Config('urlRoot')}/diagnosticos/getall`,
      responseType: 'json'
    })
}

const getOne = (id) => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/diagnosticos/getbyid/${id}`,
      responseType: 'json'
    })
}

const createOne = (payload) => {
    return axios({
      method: 'post',
      url: `${Config('urlRoot')}/diagnosticos/create`,
      data: payload,
      responseType: 'json'
    })
}

const updateOne = (id, payload) => {
  return axios({
    method: 'put',
    url: `${Config('urlRoot')}/diagnosticos/updatebyid/${id}`,
    data: payload,
    responseType: 'json'
  })
}

const deleteOne = (id) => {
  return axios({
    method: 'delete',
    url: `${Config('urlRoot')}/diagnosticos/deletebyid/${id}`,
    responseType: 'json'
  })
}

const getMedicos = () => {
  return axios({
    method: 'get',
    url: `${Config('urlRoot')}/users/getmedicos`,
    responseType: 'json'
  })
}

const getPacienteByDocument = (document) => {
  return axios({
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