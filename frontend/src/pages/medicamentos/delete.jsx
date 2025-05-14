import axios from 'axios'
import Config from '../../Config';
import { useNavigate } from "react-router";

const setDelete = (id) => {
    const navigate = useNavigate();

    axios({
    method: 'delete',
    url: `${Config('urlRoot')}/medicamento/deletebyid/${id}`,
    responseType: 'json'
    })
    .then((res) =>{
        console.log(res)
        res.data.status ? (
            notifications.show(res.data.msg, 
            {severity: 'success',autoHideDuration: 3000,})
        ) : (
            notifications.show(res.data.msg, 
            {severity: 'error',autoHideDuration: 3000,})
        )
    })
    .then(navigate('/medicamentos'))
    .catch((err) =>{
        notifications.show('Error de conexión: ' + err.message, 
        {severity: 'error',autoHideDuration: 3000,})
    })
}

export default {setDelete}