import React from 'react'
import {__esModule} from "react-to-pdf";

const ref = React.createRef()


export default function EquiposReporte() {
    return (
        <div>
            <ReactToPdf>
                {({ toPdf, targetRef }) => (
                    <div style={{ width: 500, height: 500, background: 'red' }} onClick={toPdf} ref={targetRef} />
                )}
            </ReactToPdf>
        </div>
    )
}
