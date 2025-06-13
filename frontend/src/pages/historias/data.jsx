import axios from 'axios'
import Config from '../../Config';

  const FormulasColumns = [
  {
    field: 'medico',
    headerName: 'Medico',
    type: 'text',
    width: 300,
    valueGetter: (row) => {return row.nombre}
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    type: 'text',
    width: 500,
  },
];

  const ExamenesColumns = [
  {
    field: 'medicoId',
    headerName: 'Medico',
    type: 'text',
    width: 300,
    valueGetter: (row) => {return row.nombre}
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    type: 'text',
    width: 500,
  },
  {
    field: 'fecha_vencimiento',
    headerName: 'Fecha vence',
    type: 'text',
    width: 200,
  },
];

  const diagnosticosColumns = [
  {
    field: 'medicoId',
    headerName: 'Medico',
    type: 'text',
    width: 300,
    valueGetter: (row) => {return row.nombre}
    
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    type: 'text',
    width: 500,
  },
];

const getOne = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/historia/getbyid/${id}`,
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
  FormulasColumns,
  ExamenesColumns,
  diagnosticosColumns,
  getOne,
  getPacienteByDocument,
}