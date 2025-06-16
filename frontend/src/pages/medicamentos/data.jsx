import axios from 'axios'
import Config from '../../Config';

const columns = [
    {
    field: 'imagen',
    headerName: 'Imagen',
    type: 'image',
    renderCell: (params) => <img width="100%" height="100%" src={`${Config('urlRoot')}/medicamentos/image/${params.row.imagen}`}/>,
    width: 200,
    
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    type: 'text',
    width: 200,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 400,
  },
  {
    field: 'existencia',
    headerName: 'Existencia',
    width: 150,
    type:'number'
  },
];

const getAll = () => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/medicamento/view`,
    responseType: 'json'
  })
}

const createOne = (payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'post',
    url: `${Config('urlRoot')}/medicamento/create`,
    data: payload,
    responseType: 'json'
  })
}

const getOne = (id) => {
  return  axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'get',
    url: `${Config('urlRoot')}/medicamento/getbyid/${id}`,
    responseType: 'json'
  })
}

const setDelete = (id) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'delete',
    url: `${Config('urlRoot')}/medicamento/deletebyid/${id}`,
    responseType: 'json'
  })
}

const setImage = (payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method:'post',
    url: `${Config('urlRoot')}/medicamento/uploadimage`,
    data: payload,
    responseType: 'json'
  })
}

const updateOne = (id, payload) => {
  return axios({
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method:'put',
    url:`${Config('urlRoot')}/medicamento/updatebyid/${id}`,
    data:payload
  })
}

export default {
  columns,
  getAll,
  createOne,
  setDelete,
  getOne,
  setImage,
  updateOne
}