import axios from "axios";
import Config from "../../Config";

const getAll = () => {
    return axios({
      method: 'get',
      url: `${Config('urlRoot')}/pacientes/getall`,
      responseType: 'json'
    })
}

export default {
    getAll
}