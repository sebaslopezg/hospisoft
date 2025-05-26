import axios from 'axios'
import Config from '../../Config';

  const columns = [
  {
    field: 'numeroFormula',
    headerName: 'Numero',
    type: 'text',
    width: 100,
  },
  {
    field: 'pacienteId',
    headerName: 'Paciente',
    type: 'text',
    width: 250,
  },
  {
    field: 'medico',
    headerName: 'Medico',
    type: 'text',
    width: 250,
    valueGetter: (row) => {return row.nombre}
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    type: 'text',
    width: 350,
  },
];

const getAll = () => {
  return axios({
      method: 'get',
      url: `${Config('urlRoot')}/formula_m/getall`,
      responseType: 'json'
  })
}

const getMedicos = () => {
  return axios({
    method: 'get',
    url: `${Config('urlRoot')}/formula_m/getmedicos`,
    responseType: 'json'
  })
}

const getMedicamentos = () => {
  return axios({
    method: 'get',
    url: `${Config('urlRoot')}/medicamento/getlist`,
    responseType: 'json'
  })
}

const getOne = (id) => {
  return axios({
    method: 'get',
    url: `${Config('urlRoot')}/formula_m/getbyid/${id}`,
    responseType: 'json'
  })
}

const createOne = (payload) => {
  return axios({
      method: 'post',
      url: `${Config('urlRoot')}/formula_m/create`,
      data: payload,
      responseType: 'json'
  })
}

const createFormulaDetalle = (payload) => {
  return axios({
      method: 'post',
      url: `${Config('urlRoot')}/formula_d/create`,
      data: payload,
      responseType: 'json'
  })
}

const updateOne = (id, payload) => {
  return axios({
      method: 'put',
      url: `${Config('urlRoot')}/formula_m/updatebyid/${id}`,
      data: payload,
      responseType: 'json'
  })
}

const deleteOne = (id) => {
  return axios({
      method: 'delete',
      url: `${Config('urlRoot')}/formula_m/deletebyid/${id}`,
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
  getMedicamentos,
  createFormulaDetalle
}