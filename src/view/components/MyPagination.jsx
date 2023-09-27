import React from 'react'
import { Pagination } from "react-bootstrap"

export default function MyPagination({ totalPaginas, irAPagina, paginaActual}) {
    return (
        <>
            <Pagination>
                {Array.from(Array(totalPaginas), (e, i) => {
                    return (
                        <Pagination.Item
                            key={i}
                            active={i + 1 === paginaActual}
                            onClick={() => irAPagina(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    )
                })}
            </Pagination>
        </>
    )
}
