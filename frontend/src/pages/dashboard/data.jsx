import axios from 'axios'
import Config from '../../Config';

const getPacientes = () => {
  return axios({
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getpacientes`,
      responseType: 'json'
  })
}

const getFormulas = () => {
  return axios({
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getformulas`,
      responseType: 'json'
  })
}

const getExamenes = () => {
  return axios({
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getexamenes`,
      responseType: 'json'
  })
}

const getDiagnosticos = () => {
  return axios({
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getdiagnosticos`,
      responseType: 'json'
  })
}

export default {
    getPacientes,
    getFormulas,
    getExamenes,
    getDiagnosticos,
}