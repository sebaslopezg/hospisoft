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
    headerName: 'Desccripcion',
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
    headerName: 'Desccripcion',
    type: 'text',
    width: 500,
  },
];

const getOne = (id) => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/historia/getbyid/68463ff2f02f9055be03b848`,
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
  FormulasColumns,
  ExamenesColumns,
  diagnosticosColumns,
  getOne,
  getPacienteByDocument,
}