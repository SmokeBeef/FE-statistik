import React, { useEffect, useRef, useState } from "react";
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
import axios from "../utils/axios"

export default function Detail() {
  const tableRef = useRef(null);
  const today = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = today
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "-");

  const [dataMatch, setDataMatch] = useState([])
  const [data, setData] = useState()

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Play- ${formattedDate}`,
    sheet: `Play- ${formattedDate}`,
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


  const onChangeHandle = async (id) => {
    await axios.get("match/"+id)
    .then(res => {
      console.log(res.data);
      setData(res.data.data)
    })
    .catch(err => {

    })
  }
  const getMatch = async () => {
    await axios.get("match")
      .then(res => {
        setDataMatch(res.data.data)
      })
      .catch(err => { })
  }
  useEffect(() => {
    getMatch()
  }, [])

  return (
    <div>
      <Navbar />
      <Background />
      <main className="font-Poppins">
      {/* <PDFDownloadLink
          document={<MyDoc detail={detail} />}
          fileName={`Play-${formattedDate}.pdf`}
          className="bg-red-500 text-slate-100 rounded-lg py-2 px-3 ml-2 hover:bg-red-800 transition-colors"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Export to PDF"
          }
        </PDFDownloadLink> */}
        <button
          className="bg-green-500 text-slate-100 rounded-lg py-2 px-3 ml-4 mt-4 hover:bg-green-800 transition-colors shadow-md"
          onClick={onDownload}
        >
          Export to Excel
        </button>
        <form action="" className="mt-4 text-center">
          <div className="">
            <label
              htmlFor="match"
              className="block text-white text-3xl font-bold mb-2"
            >
              Detail Pertandingan
            </label>
            <select
            onChange={(e) => onChangeHandle(e.target.value)}
              name=""
              id="match"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">---Pilih Pertandingan---</option>
              {dataMatch.map(data => (
                <option className="text-center"  value={data.id}>
                  <span>
                    {data.home_team.name}------
                  </span>
                  <span>
                    {data.away_team.name}
                  </span>
                </option>

              ))}
            </select>
          </div>
        </form>

        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
          <div className="flex justify-between bg-gray-200 text-gray-700 py-2 px-2">
            <div className="w-1/3 text-center text-2xl font-bold flex justify-center items-center">
              <span>Team A</span>
            </div>
            <div className="w-1/3 text-center text-5xl font-extrabold">
              <span>0 - 0</span>
            </div>
            <div className="w-1/3 text-center text-2xl font-bold flex justify-center items-center">
              <span>Team B</span>
            </div>
          </div>
          <div className="flex justify-between py-3 px-2">
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>1</span>
            </div>
            <div className="w-1/3 text-center text-xl font-semibold">
              <span>Yellow Card</span>
            </div>
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>3</span>
            </div>
          </div>
          <div className="flex justify-between py-3 px-2">
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>1</span>
            </div>
            <div className="w-1/3 text-center text-xl font-semibold">
              <span>Red Card</span>
            </div>
            <div className="w-1/3 text-center text-lg font-medium flex justify-center items-center">
              <span>3</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-10">
          <table
            className="bg-white mt-5 border border-slate-400 w-[90%]"
            ref={tableRef}
          >
            <thead className="text-lg">
              <th className="p-2 border border-slate-300">No</th>
              <th className="p-2 border border-slate-300">Nama</th>
              <th className="p-2 border border-slate-300">Nomor Jersey</th>
              <th className="p-2 border border-slate-300">Posisi</th>
              <th className="p-2 border border-slate-300">Team</th>
              <th className="p-2 border border-slate-300">Kartu Merah</th>
              <th className="p-2 border border-slate-300">Kartu Kuning</th>
            </thead>
            <tbody className="text-center">
                <tr>
                  <td className="p-2 border border-slate-300">1</td>
                  <td className="p-2 border border-slate-300">Nama</td>
                  <td className="p-2 border border-slate-300">
                    Nomor J 
                  </td>
                  <td className="p-2 border border-slate-300">
                   Posisi 
                  </td>
                  <td className="p-2 border border-slate-300">
                    Team
                  </td>
                  <td className="p-2 border border-slate-300">
                    Team
                  </td>
                  <td className="p-2 border border-slate-300">
                    Team
                  </td>
                </tr>
              <tr>
                <td className="p-2 border border-slate-300">1</td>
                <td className="p-2 border border-slate-300">Nama</td>
                <td className="p-2 border border-slate-300">
                  Nomor J
                </td>
                <td className="p-2 border border-slate-300">
                  Posisi
                </td>
                <td className="p-2 border border-slate-300">
                  Team
                </td>
                <td className="p-2 border border-slate-300">
                  Team
                </td>
                <td className="p-2 border border-slate-300">
                  Team
                </td>
                <td className="p-2 border border-slate-300">
                  Team
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
