import axios from 'axios'
import Config from '../../Config';

const login = (payload) => {
    return axios({
        method: 'post',
        url: `${Config('urlRoot')}/users/login`,
        data: payload,
        responseType: 'json'
    })
}

export default {
    login,
}