import axios from "axios";
import Config from "../../Config";

  const columns = [
  {
    field: '_id',
    headerName: 'ID',
    type: 'text',
    width: 150,
  },
  {
    field: 'formulaId',
    headerName: 'Numero formula',
    type: 'text',
    width: 200,
    valueGetter: (row) => {return row.numeroFormula}
  },
  {
    field: 'nota',
    headerName: 'Nota',
    type: 'text',
    width: 500,
  },
  {
    field: 'totalMedicamentos',
    headerName: 'Total medicamentos',
    type: 'text',
    width: 200,
  },
];

const getFormula = (numero) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/formula_d/getByFormulaNumber/${numero}`,
    responseType: 'json'
  })
}

const createOne = (payload)=>{
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/dispensario_m/create`,
    data: payload,
    responseType: 'json'
  })
}

const createDispensarioDetalle = (payload)=>{
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/dispensario_d/create`,
    data: payload,
    responseType: 'json'
  })
}

const getAll = ()=>{
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/dispensario_m/getall`,
    responseType: 'json'
  })
}

export default {
  columns,
  getFormula,
  createOne,
  createDispensarioDetalle,
  getAll
}