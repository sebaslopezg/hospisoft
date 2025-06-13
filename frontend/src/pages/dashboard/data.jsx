import axios from 'axios'
import Config from '../../Config';

const getPacientes = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getpacientes`,
      responseType: 'json'
  })
}

const getFormulas = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getformulas`,
      responseType: 'json'
  })
}

const getExamenes = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getexamenes`,
      responseType: 'json'
  })
}

const getDiagnosticos = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getdiagnosticos`,
      responseType: 'json'
  })
}

const getDispensario = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
      method: 'get',
      url: `${Config('urlRoot')}/metrics/getdispensario`,
      responseType: 'json'
  })
}

export default {
    getPacientes,
    getFormulas,
    getExamenes,
    getDiagnosticos,
    getDispensario,
}