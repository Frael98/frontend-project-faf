import {instance} from './axios';

export const autenticarUsuario = async () => {
    return await instance.post('/user/autenticacion')
}
