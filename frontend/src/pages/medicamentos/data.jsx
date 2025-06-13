import axios from 'axios'
import Config from '../../Config';


const columns = [
    {
    field: 'imagen',
    headerName: 'Imagen',
    type: 'image',
    renderCell: (params) => <img width="100%" height="100%" src={`${Config('urlRoot')}/medicamento/image/${params.row.imagen}`}/>,
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

export default {
    columns,
    getAll,
    createOne,
}