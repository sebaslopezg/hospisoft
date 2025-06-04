import axios from 'axios'
import Config from '../../Config';

const login = () => {
    return axios({
        method: 'post',
        url: `${Config('urlRoot')}/users/login`,
        responseType: 'json'
    })
}

export default {
    login,
}