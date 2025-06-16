import axios from 'axios'
import Config from '../../Config';

const getAllPacientes = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/pacientes/getall`,
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

export default {
    sendMail,
    getAllPacientes
}