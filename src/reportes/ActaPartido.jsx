import { Document, Page, StyleSheet, View, PDFViewer, Text } from "@react-pdf/renderer";
import { useState } from "react";

const acta = {
    titulo: "This is react pdf"
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})

const ActaPartidoReport = ({ acta }) => {

    return (<>
        <Document>
            <Page size='A4' style={styles.page} >
                <View style={styles.section}>
                    <Text>
                        {acta.titulo}
                    </Text>
                </View>
            </Page>
        </Document>
    </>);
}


export const Test = () => {

    const [verPDF, setVerPDF] = useState(false)
    return (< >
        <div className="my-2 row" style={{ minHeight: "100vh", minWidth: "100vh" }}>
            <div className="col">
                <button className="btn btn-info" onClick={() => setVerPDF(!verPDF)}>Imprimir PDF</button>
            </div>

            {verPDF ?
                <PDFViewer style={{ with: "900%", height: "90vh" }}>
                    <ActaPartidoReport acta={acta} />
                </PDFViewer>
                : "No hay pdf"}
        </div>
    </>);
}