import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/background";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

export default function Detail() {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "excel" - Date.now,
    sheet: "excel" - Date.now,
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      marginBottom: 10,
      fontFamily: "Helvetica",
      fontSize: 10,
      width: "100%",
    },
    tableHeader: {
      backgroundColor: "#f0f0f0",
      fontWeight: "bold",
    },
    tableRow: {
      borderBottomWidth: 1,
      borderColor: "#f0f0f0",
      flexDirection: "row",
    },
    tableCell: {
      padding: 5,
      color: "#000000",
    },
  });

  const MyDoc = () => (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableCell, ...styles.tableHeader }}>
                <Text style={styles.tableHeaderText}>Nama</Text>
              </View>
              <View style={{ ...styles.tableCell, ...styles.tableHeader }}>
                <Text style={styles.tableHeaderText}>Email</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>John Doe</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>john.doe@example.com</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>Jane Smith</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>jane.smith@example.com</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  const today = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = today.toLocaleDateString('en-GB', options).replace(/\//g, '-');
  
  return (
    <div>
      <Navbar />
      <Background />
      <main className="font-Poppins">
        <form action="" className="mt-10 text-center">
          <div className="">
            <label
              htmlFor="match"
              className="block text-white text-3xl font-bold mb-2"
            >
              Detail Pertandingan
            </label>
            <select
              name=""
              id="match"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">---Pilih Pertandingan---</option>
            </select>
          </div>
        </form>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableRow}>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                Nama
              </th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.tableRow}>
              <td style={styles.tableCell}>John Doe</td>
              <td style={styles.tableCell}>john.doe@example.com</td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.tableCell}>Jane Smith</td>
              <td style={styles.tableCell}>jane.smith@example.com</td>
            </tr>
          </tbody>
        </table>
        <PDFDownloadLink
          document={<MyDoc />}
          fileName={`Play-${formattedDate}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>
      </main>
    </div>
  );
}
