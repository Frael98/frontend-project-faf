import {instance} from './../axios';
//Peticion para editar
export const obtenerEquipo = async (id) => {
    return await instance.get(`/equipo/getEquipo/${id}`)
}

export const listarEquipos = async () => {
    return await instance.get(`/equipo/getEquipos`)
}

export const listarEquipos_ = async (valor) => {
    return await instance.get(`/equipo/getEquipos/${valor}`)
}

export const saveEquipo = async (equipo) => {
    return await instance.post(`/equipo/save`, equipo)
}

export const upadteEquipo = async (id, equipo) => {
    return await instance.put(`/equipo/update/${id}`, equipo)
}

export const eliminarEquipo = async (id) => {
    return await instance.delete(`/equipo/delete/${id}`)
}

export const listarEquiposFiltro = async (valor) => {
    return await instance.get(`/equipo/getEquipos`, valor);
}