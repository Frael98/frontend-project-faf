import {instance} from '../axios';
//Peticion para editar
export const obtenerActaPartido = async (id) => {
    return await instance.get(`/acta-partido/getActaPartido/${id}`)
}

export const listarActaPartidos_ = async (valor) => {
    return await instance.get(`/acta-partido/getActaPartidos/${valor}`)
}

export const saveActaPartido = async (acta_partido) => {
    return await instance.post(`/acta-partido/save`, acta_partido)
}

export const upadteActaPartido = async (id, acta_partido) => {
    return await instance.put(`/acta-partido/update/${id}`, acta_partido)
}

export const eliminarActaPartido = async (id) => {
    return await instance.delete(`/acta-partido/delete/${id}`)
}

export const listarActaPartidosFiltro = async (valor) => {
    return await instance.get(`/acta-partido/getActaPartidos`, valor);
}