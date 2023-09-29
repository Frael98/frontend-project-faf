/* Uso de react-pdf */
import React, { useEffect, useState } from "react";
// importamos los componentes
import {
  Document,
  Page,
  Text, View, StyleSheet, PDFViewer
} from "@react-pdf/renderer";
import { listarArbitros } from "../services/peticiones/arbitro-re";
import { ColumnasArbitros } from "../models/Columnas";

// Configuracion de los estilos
const styles = StyleSheet.create({
  View: {
    minHeight: '100vh',
    width: '100%'
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexFlow: 1
  },
  encabezado: {
    backgroundColor: '#212529',
    width: '100%',
    height: '5vh',
    textAlign: 'center'
  },
  table: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    margin: '10px',
    flexFlow: 1
  },
  tableRow: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: '#aaa',
    borderStyle: 'solid',
    borderColor: '#000',
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  textCenter: {
    textAlign: 'center'
  },
  tableCell: {
    fontSize: 7,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
  }
});

/**
 * 
 * @returns 
 */
const Encabezado = () => {
  return (
    <>
      <View style={styles.encabezado}>
        <Text style={{textAlign: 'center', color: 'white'}} > Listado de Arbitros</Text>
      </View>
    </>
  )
}

/**
 * Tabla Arbitros
 * @param arbitros
 * @returns 
 */
const Tabla = ({ arbitros }) => {

  return (
    <>
      <View style={styles.table}> {/* Tabla */}

        <View style={[styles.header, styles.tableRow]}> {/* Tabla Encabezado */}

          {ColumnasArbitros.map((e, i) => (
            <View key={i} style={{ width: '15%' }}>
              <Text style={styles.tableCellHeader}>{e}</Text>
            </View>
          ))}

        </View>

        {arbitros?.map((item, index) => ( /* Tabla cuerpo */
          <View key={index} style={[styles.tableRow]}>
            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.nombre}</Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.apellido}</Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.correo}</Text>
            </View>

            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.usuario}</Text>
            </View>

            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.categoria}</Text>
            </View>

            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.direccion}</Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.nacionalidad}</Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text style={styles.tableCell}>{item.partidos}</Text>
            </View>

          </View>
        ))}

      </View>
    </>
  );
};


export const PDFArbitro = () => {

  const [arbitros, setArbitros] = useState(null);

  const getData = async () => {
    const tmp = await (await listarArbitros()).data
    setArbitros(tmp)
  }

  useEffect(() => {
    getData();
  })

  return (
    <>
      <PDFViewer style={styles.View}>
        <Document>
          <Page size="A4" orientation="landscape" style={styles.page}>
            <View>
              <Encabezado />
              <Tabla arbitros={arbitros}></Tabla>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  )
}

