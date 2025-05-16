import axios from 'axios'
import Config from '../../Config';

const getAll = () => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}/cita/view`,
        responseType: 'json'
    })
}

const getOne = (id) => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}/cita/getbyid/${id}`,
        responseType: 'json'
    })
}

const createOne = (payload) => {
    return axios({
        method: 'post',
        url: `${Config('urlRoot')}/cita/create`,
        data: payload,
        responseType: 'json'
    })
}

const updateOne = (id, payload) => {
    return axios({
        method: 'put',
        url: `${Config('urlRoot')}/${id}`,
        data: payload,
        responseType: 'json'
    })
}

const deleteOne = (id) => {
  return axios({
    method: 'delete',
    url: `${Config('urlRoot')}/cita/deletebyid/${id}`,
    responseType: 'json'
  })
}



export default {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}