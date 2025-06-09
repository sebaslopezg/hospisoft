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
  {
    field: 'fecha_vencimiento',
    headerName: 'Fecha vence',
    type: 'text',
    width: 200,
  },
];

const getAll = () => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/examenes/getall`,
      responseType: 'json'
    })
}

const getOne = (id) => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/examenes/getbyid/${id}`,
      responseType: 'json'
    })
}

const createOne = (payload) => {
    return axios({
      method: 'post',
      url: `${Config('urlRoot')}/examenes/create`,
      data: payload,
      responseType: 'json'
    })
}

const updateOne = (id, payload) => {
  return axios({
    method: 'put',
    url: `${Config('urlRoot')}/examenes/updatebyid/${id}`,
    data: payload,
    responseType: 'json'
  })
}

const deleteOne = (id) => {
  return axios({
    method: 'delete',
    url: `${Config('urlRoot')}/examenes/deletebyid/${id}`,
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