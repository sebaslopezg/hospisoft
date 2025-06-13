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
    headerName: 'Nombre',
    type: 'text',
    width: 150,
    valueGetter: (row) => {return row.nombre}
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

const MedicamentosDetails = [
  { 
    field: 'medicamentoId', 
    headerName: 'Medicamento', 
    width: 250,
    valueGetter: (row) => {return row.nombre}
  },
  { 
    field: 'dosificacion', 
    headerName: 'Dosificacion', 
    width: 100 
  },
  { 
    field: 'cantidad', 
    headerName: 'Cantidad', 
    width: 100 
  },
  { 
    field: 'descripcion', 
    headerName: 'Descripcion', 
    width: 400 
  },
];

const getAll = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/formula_m/getall`,
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

const getMedicos = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/formula_m/getmedicos`,
    responseType: 'json'
  })
}

const getMedicamentos = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/medicamento/getlist`,
    responseType: 'json'
  })
}

const setMedicamentos = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/formula_m/setmedicamento/${id}`,
    responseType: 'json'
  })
}

const getOne = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/formula_m/getbyid/${id}`,
    responseType: 'json'
  })
}

const createOne = (payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/formula_m/create`,
    data: payload,
    responseType: 'json'
  })
}

const createFormulaDetalle = (payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/formula_d/create`,
    data: payload,
    responseType: 'json'
  })
}

const getFormulaDetalle = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/formula_d/getByFormula/${id}`,
    responseType: 'json'
  })
}

const updateOne = (id, payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'put',
    url: `${Config('urlRoot')}/formula_m/updatebyid/${id}`,
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
    url: `${Config('urlRoot')}/formula_m/deletebyid/${id}`,
    responseType: 'json'
  })
}

const deleteMedicamento = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'delete',
    url: `${Config('urlRoot')}/formula_d/deletebyid/${id}`,
    responseType: 'json'
  })
}

const getOneDetalle = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/formula_d/getbyid/${id}`,
    responseType: 'json'
  })
}

const updateOneDetalle = (id, payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'put',
    url: `${Config('urlRoot')}/formula_d/updatebyid/${id}`,
    data:payload,
    responseType: 'json'
  })
}

export default {
  columns,
  MedicamentosDetails,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getMedicos,
  getMedicamentos,
  createFormulaDetalle,
  setMedicamentos,
  getPacienteByDocument,
  getFormulaDetalle,
  deleteMedicamento,
  updateOneDetalle,
  getOneDetalle
}