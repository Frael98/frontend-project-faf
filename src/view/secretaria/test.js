import React, { useState } from "react";
import ReactTable from "react-table";
/* import "react-table/react-table.css"; */
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const data = [
  { name: "Juan", lastName: "Perez" },
  { name: "Maria", lastName: "Garcia" },
  { name: "Pedro", lastName: "Rodriguez" }
];

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export const Tablas = () => {
  const [pdfVisible, setPdfVisible] = useState(false);

  const handlePrint = () => {
    setPdfVisible(true);
  };

  const handleClosePdf = () => {
    setPdfVisible(false);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name"
    },
    {
      Header: "Apellido",
      accessor: "lastName"
    }
  ];

  return (
    <>
      <ReactTable data={data} columns={columns} />
     {/*  <button onClick={handlePrint}>Imprimir</button>
      {pdfVisible && (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              {data.map((item, index) => (
                <View key={index}>
                  <Text>{item.name}</Text>
                  <Text>{item.lastName}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      )}
      {pdfVisible && <button onClick={handleClosePdf}>Cerrar</button>} */}
    </>
  );
};

