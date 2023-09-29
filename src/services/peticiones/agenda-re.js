import {instance} from '../axios';
//Peticion para editar
export const obtenerAgenda = async (id) => {
    return await instance.get(`/agenda/getAgenda/${id}`)
}

export const listarAgendas_ = async (valor) => {
    return await instance.get(`/agenda/getAgendas/${valor}`)
}

export const saveAgenda = async (agenda) => {
    return await instance.post(`/agenda/save`, agenda)
}

export const upadteAgenda = async (id, agenda) => {
    return await instance.put(`/agenda/update/${id}`, agenda)
}

export const eliminarAgenda = async (id) => {
    return await instance.delete(`/agenda/delete/${id}`)
}

export const listarAgendasFiltro = async (valor) => {
    return await instance.get(`/agenda/getAgendas`, valor);
}