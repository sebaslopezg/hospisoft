import axios from 'axios'
import Config from '../../Config';

const login = () => {
    return axios({
        method: 'get',
        url: `${Config('urlRoot')}/`,
        responseType: 'json'
    })
}

export default {
    login,
}