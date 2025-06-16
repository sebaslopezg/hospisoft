import axios from 'axios'
import Config from '../../Config';

const getAll = () => {
  return axios({
    method: 'get',
    url: `${Config('urlRoot')}/cita/view`,
    responseType: 'json',
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

const getOne = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/cita/getbyid/${id}`,
    responseType: 'json'
  })
}

const createOne = (payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/cita/create`,
    data: payload,
    responseType: 'json'
  })
}

const updateOne = (id, payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'put',
    url: `${Config('urlRoot')}/cita/updatebyid/${id}`,
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
    url: `${Config('urlRoot')}/cita/deletebyid/${id}`,
    responseType: 'json'
  })
}

const getMedicos = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/users/getmedicos`,
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

const sendMail = (payload)=>{
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/messages/sendmail`,
    data: payload,
    responseType: 'json'
  })
}

const getOnePaciente = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/pacientes/getbyid/${id}`,
    responseType: 'json'
  })
}

export default {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    getMedicos,
    getPacienteByDocument,
    sendMail,
    getOnePaciente
}