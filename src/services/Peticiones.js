import {instance} from './axios';

// Peticiones para inicio sesion
export const autenticarUsuario = async (user) => {
    return await instance.post(`/administrador/get/${user.usuario}`, user)
}

export const autenticarArbitro = async (user) => {
    return await instance.post(`/arbitro/getArbitroUsuario`, user)
}

//Peticion para registrar un usuario
export const signupUsuario = async (nuevoUsuario) => {
    return await instance.post('/administrador/signuo', nuevoUsuario)
}


