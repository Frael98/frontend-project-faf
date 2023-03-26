import { obtenerEquipo } from "../services/peticiones-arbitro/equipo-re";



test('obtener Equipo - debe retornar un equipo', async () => {
    const id = 1;
    const equipo = await (await obtenerEquipo(id)).data;

    console.log(equipo)
    expect(equipo).toEqual({
        "createdAt": "2023-03-18",
        "estado": "A",
        "id_equipo": 2,
        "nombre": "Barcelona",
        "director": "María González",
        "partido_rival": null,
        "partido_local": null,
        "updateAt": null
    })
})
