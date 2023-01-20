import {instance} from './axios';

export const autenticarUsuario = async (user) => {
    return await instance.post(`/administrador/get/${user.usuario}`, user)
}

export const autenticarArbitro = async ({}) => {
    return await instance.post('/arbitro/autenticacion')
}

export const signupUsuario = async (nuevoUsuario) => {
    return await instance.post('/administrador/save', nuevoUsuario)
}

export const editUsuario = async (id) => {
    return await instance.put(`${id}`)
}

export const saveArbitro = async (arbitro) => {
    return await instance.post(`/arbitro/save`, arbitro)
}