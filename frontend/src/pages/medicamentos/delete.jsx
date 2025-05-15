import axios from 'axios'
import Config from '../../Config';

const setDelete = (id) => {

    return axios({
    method: 'delete',
    url: `${Config('urlRoot')}/medicamento/deletebyid/${id}`,
    responseType: 'json'
    })
}

export default {setDelete}