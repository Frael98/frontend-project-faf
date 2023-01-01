import {instance} from './axios';

export const autenticarUsuario = async ({}) => {
    return await instance.post('/user/autenticacion')
}

export const saveUsuario = async () => {
    return await instance.post('')
}

export const editUsuario = async (id) => {
    return await instance.put(`${id}`)
}