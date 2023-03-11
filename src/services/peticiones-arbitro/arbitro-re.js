import {instance} from './../axios';
//Peticion para editar
export const editarArbitro = async (id) => {
    return await instance.put(`${id}`)
}

export const listarArbitros = async () => {
    return await instance.get(`/arbitro/getArbitros`)
}

export const saveArbitro = async (arbitro) => {
    return await instance.post(`/arbitro/save`, arbitro)
}