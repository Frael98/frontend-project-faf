import {instance} from './../axios';
//Peticion para editar
export const obtenerArbitro = async (id) => {
    return await instance.get(`/arbitro/getArbitro/${id}`)
}

export const listarArbitros = async () => {
    return await instance.get(`/arbitro/getArbitros`)
}

export const saveArbitro = async (arbitro) => {
    return await instance.post(`/arbitro/save`, arbitro)
}

export const upadteArbitro = async (id, arbitro) => {
    return await instance.put(`/arbitro/update/${id}`, arbitro)
}

export const eliminarArbitro = async (id) => {
    return await instance.delete(`/arbitro/delete/${id}`)
}
// PDF
export const downloadPDF = async () => {
    return await instance.get(`/pdf-arbitros/generate-pdf`, {
        responseType: 'blob', // Solicita una respuesta binaria (archivo)
    });
}