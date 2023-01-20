import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";

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

const ActaPartidoReport = ({acta}) => {

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

export default ActaPartidoReport;