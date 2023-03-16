import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer";

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


export const ArbitrosReporte = ({ arbitros, titulo }) => {

    return (<>
        <Document>
            <Page size='A4' style={styles.page} >
                <View style={styles.section}>
                    <Text>
                        {titulo}
                    </Text>
                </View>
            </Page>
        </Document>
    </>);
}
