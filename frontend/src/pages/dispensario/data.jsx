import axios from "axios";
import Config from "../../Config";

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

const getFormula = (numero) => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/formula_m/getbynumero/${numero}`,
      responseType: 'json'
    })
}

export default {
  columns,
  getFormula
}