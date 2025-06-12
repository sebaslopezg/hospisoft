import axios from "axios";
import Config from "../../Config";

  const columns = [
  {
    field: 'medicamentoId',
    headerName: 'Medicamento',
    type: 'text',
    width: 250,
    valueGetter: (row) => {return row.nombre}
  },
  {
    field: 'dosificacion',
    headerName: 'Dosificacion',
    type: 'text',
    width: 250,
  },
  {
    field: 'cantidad',
    headerName: 'Cantidad',
    type: 'text',
    width: 250,
  },
];

const getFormula = (numero) => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/formula_d/getByFormulaNumber/${numero}`,
      responseType: 'json'
    })
}

export default {
  columns,
  getFormula
}